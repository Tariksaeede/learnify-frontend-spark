import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { CourseCard } from "@/components/courses/CourseCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

export default function Catalog() {
  const navigate = useNavigate();
  const { courses, teachersById } = useApp();
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "live" | "recorded">("all");

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchesQuery = `${c.title} ${c.description ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "live" && c.type === 0) ||
        (typeFilter === "recorded" && c.type === 1);
      return matchesQuery && matchesType && c.status === 1;
    });
  }, [courses, query, typeFilter]);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-accent/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">Course Catalog</h1>
          <p className="text-muted-foreground text-lg">
            Discover {courses.filter(c => c.status === 1).length}+ courses from expert teachers
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-12 rounded-full"
              />
            </div>
            <div className="flex gap-2">
              <FilterButton
                active={typeFilter === "all"}
                onClick={() => setTypeFilter("all")}
              >
                All
              </FilterButton>
              <FilterButton
                active={typeFilter === "live"}
                onClick={() => setTypeFilter("live")}
              >
                Live
              </FilterButton>
              <FilterButton
                active={typeFilter === "recorded"}
                onClick={() => setTypeFilter("recorded")}
              >
                Recorded
              </FilterButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                teacher={teachersById.get(course.teacherId)!}
                onClick={() => navigate(`/courses/${course.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({ 
  active, 
  onClick, 
  children 
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) {
  return (
    <Button
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className="rounded-full"
    >
      {children}
    </Button>
  );
}
