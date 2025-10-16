import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatMoney, formatLocalDateTime } from "@/lib/formatters";
import { ArrowLeft, Calendar, Users, Video, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { courses, teachersById, me, myEnrollments, setEnrollments, setCourses } = useApp();

  const course = courses.find((c) => c.id === Number(id));
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course not found</h2>
          <Button onClick={() => navigate("/catalog")}>Back to Catalog</Button>
        </div>
      </div>
    );
  }

  const teacher = teachersById.get(course.teacherId)!;
  const isEnrolled = me && myEnrollments.has(course.id);
  const isTeacherOwner = me?.role === 1 && me.id === course.teacherId;

  function handleEnroll() {
    if (!me || me.role !== 0) {
      toast.error("Please login as a Student to enroll");
      return;
    }
    setEnrollments((prev) => {
      const next = { ...prev };
      next[me.id] = new Set<number>(next[me.id] ?? new Set<number>());
      next[me.id].add(course.id);
      return next;
    });
    toast.success("Successfully enrolled! Check My Courses.");
  }

  function handleUnenroll() {
    if (!me) return;
    setEnrollments((prev) => {
      const next = { ...prev };
      const set = new Set<number>(next[me.id] ?? new Set<number>());
      set.delete(course.id);
      next[me.id] = set;
      return next;
    });
    toast.success("Unenrolled from course");
  }

  function togglePublish() {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === course.id ? { ...c, status: c.status === 1 ? 0 : 1 } : c
      )
    );
    toast.success(course.status === 1 ? "Course unpublished" : "Course published");
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/catalog")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalog
        </Button>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-border">
              {course.imageUrl ? (
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-80 object-cover"
                />
              ) : (
                <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-primary-glow/20" />
              )}
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={course.type === 0 ? "default" : "secondary"}>
                  {course.type === 0 ? (
                    <>
                      <Video className="w-3 h-3 mr-1" />
                      Live Course
                    </>
                  ) : (
                    "Recorded Course"
                  )}
                </Badge>
                {course.type === 0 && course.scheduleUtc && (
                  <Badge variant="outline">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatLocalDateTime(course.scheduleUtc)}
                  </Badge>
                )}
                {course.maxCapacity && (
                  <Badge variant="outline">
                    <Users className="w-3 h-3 mr-1" />
                    {course.maxCapacity} seats
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold mb-3">{course.title}</h1>
              <p className="text-muted-foreground text-lg">
                By {teacher.name} {teacher.surname}
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-bold mb-3">About this course</h2>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {course.description}
              </p>
            </div>

            {course.type === 0 && course.meetingLink && (
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Video className="w-5 h-5 text-primary" />
                  Meeting Link
                </h3>
                <a
                  href={course.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline flex items-center gap-2"
                >
                  {course.meetingLink}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 rounded-2xl border border-border bg-card shadow-lg">
              <div className="text-4xl font-bold text-primary mb-6">
                {formatMoney(course.basePrice)}
              </div>

              <div className="space-y-3">
                {isTeacherOwner && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={togglePublish}
                  >
                    {course.status === 1 ? "Unpublish Course" : "Publish Course"}
                  </Button>
                )}
                
                {me?.role === 0 && (
                  isEnrolled ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleUnenroll}
                    >
                      Unenroll
                    </Button>
                  ) : (
                    <Button className="w-full" size="lg" onClick={handleEnroll}>
                      Enroll Now
                    </Button>
                  )
                )}

                {!me && (
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => navigate("/login")}
                  >
                    Sign in to Enroll
                  </Button>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <InfoRow label="Course Type" value={course.type === 0 ? "Live" : "Recorded"} />
                {course.type === 0 && course.scheduleUtc && (
                  <InfoRow label="Scheduled" value={formatLocalDateTime(course.scheduleUtc)} />
                )}
                {course.maxCapacity && (
                  <InfoRow label="Max Students" value={course.maxCapacity.toString()} />
                )}
                <InfoRow label="Instructor" value={`${teacher.name} ${teacher.surname || ""}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
