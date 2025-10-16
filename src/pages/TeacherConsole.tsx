import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Course } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Eye } from "lucide-react";

type NewCourse = Omit<Course, "id">;

export default function TeacherConsole() {
  const navigate = useNavigate();
  const { me, courses, setCourses } = useApp();

  const [draft, setDraft] = useState<NewCourse>({
    teacherId: me?.id ?? 1,
    title: "",
    description: "",
    basePrice: 0,
    type: 1,
    scheduleUtc: null,
    maxCapacity: null,
    meetingLink: null,
    imageUrl: null,
    status: 1,
  });

  if (!me || me.role !== 1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Teachers Only</h2>
          <p className="text-muted-foreground mb-6">
            Sign in as a teacher to access the console
          </p>
          <Button onClick={() => navigate("/login")}>Sign In</Button>
        </div>
      </div>
    );
  }

  const myCourses = courses.filter((c) => c.teacherId === me.id);

  function validateDraft(d: NewCourse) {
    const errs: string[] = [];
    if (!d.title.trim()) errs.push("Title is required");
    if (d.basePrice < 0) errs.push("Base price must be ≥ 0");
    if (d.type === 0 && !d.scheduleUtc) errs.push("Live course requires a schedule");
    if (d.type === 1 && d.scheduleUtc) errs.push("Recorded course must not have a schedule");
    if (d.maxCapacity !== null && d.maxCapacity <= 0) errs.push("Max capacity must be > 0");
    return errs;
  }

  function handleCreate() {
    const errs = validateDraft(draft);
    if (errs.length) {
      toast.error(errs.join(", "));
      return;
    }

    const newId = Math.max(0, ...courses.map((c) => c.id)) + 1;
    setCourses((prev) => [{ id: newId, ...draft }, ...prev]);
    toast.success("Course created successfully!");
    
    setDraft({
      teacherId: me.id,
      title: "",
      description: "",
      basePrice: 0,
      type: 1,
      scheduleUtc: null,
      maxCapacity: null,
      meetingLink: null,
      imageUrl: null,
      status: 1,
    });
  }

  function togglePublish(courseId: number) {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: c.status === 1 ? 0 : 1 } : c))
    );
    toast.success("Course status updated");
  }

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-accent/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Teacher Console</h1>
          <p className="text-muted-foreground text-lg">
            Create and manage your courses
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Create Course Form */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Create New Course
              </h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., React Fundamentals"
                    value={draft.title}
                    onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Course description..."
                    value={draft.description ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="price">Price (USD) *</Label>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      step={0.01}
                      value={draft.basePrice}
                      onChange={(e) => setDraft((d) => ({ ...d, basePrice: Number(e.target.value) }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="type">Type *</Label>
                    <select
                      id="type"
                      value={draft.type}
                      onChange={(e) => {
                        const v = Number(e.target.value) as 0 | 1;
                        setDraft((d) => ({ 
                          ...d, 
                          type: v, 
                          scheduleUtc: v === 1 ? null : d.scheduleUtc 
                        }));
                      }}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value={1}>Recorded</option>
                      <option value={0}>Live</option>
                    </select>
                  </div>
                </div>

                {draft.type === 0 && (
                  <div>
                    <Label htmlFor="schedule">Schedule (ISO DateTime)</Label>
                    <Input
                      id="schedule"
                      type="datetime-local"
                      value={draft.scheduleUtc ? new Date(draft.scheduleUtc).toISOString().slice(0, 16) : ""}
                      onChange={(e) => setDraft((d) => ({ 
                        ...d, 
                        scheduleUtc: e.target.value ? new Date(e.target.value).toISOString() : null 
                      }))}
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="capacity">Max Capacity</Label>
                    <Input
                      id="capacity"
                      type="number"
                      min={1}
                      placeholder="Optional"
                      value={draft.maxCapacity ?? ""}
                      onChange={(e) =>
                        setDraft((d) => ({ 
                          ...d, 
                          maxCapacity: e.target.value ? Number(e.target.value) : null 
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="meeting">Meeting Link</Label>
                    <Input
                      id="meeting"
                      placeholder="https://..."
                      value={draft.meetingLink ?? ""}
                      onChange={(e) => setDraft((d) => ({ ...d, meetingLink: e.target.value || null }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="image">Cover Image URL</Label>
                  <Input
                    id="image"
                    placeholder="https://..."
                    value={draft.imageUrl ?? ""}
                    onChange={(e) => setDraft((d) => ({ ...d, imageUrl: e.target.value || null }))}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="publish"
                    type="checkbox"
                    checked={draft.status === 1}
                    onChange={(e) => setDraft((d) => ({ ...d, status: e.target.checked ? 1 : 0 }))}
                    className="rounded"
                  />
                  <Label htmlFor="publish" className="cursor-pointer">
                    Publish immediately
                  </Label>
                </div>

                <Button className="w-full" size="lg" onClick={handleCreate}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Course
                </Button>
              </div>
            </div>
          </div>

          {/* My Courses List */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6">
              Your Courses ({myCourses.length})
            </h2>

            <div className="space-y-4">
              {myCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold">{course.title}</h3>
                        <Badge variant={course.status === 1 ? "default" : "secondary"}>
                          {course.status === 1 ? "Published" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                        <span>{course.type === 0 ? "Live" : "Recorded"}</span>
                        <span>${course.basePrice}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePublish(course.id)}
                      >
                        {course.status === 1 ? "Unpublish" : "Publish"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/courses/${course.id}`)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {myCourses.length === 0 && (
                <div className="text-center py-12 border border-dashed rounded-2xl">
                  <p className="text-muted-foreground">
                    No courses yet. Create your first course!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
