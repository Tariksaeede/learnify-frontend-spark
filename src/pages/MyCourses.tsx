import { useNavigate } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { CourseCard } from "@/components/courses/CourseCard";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";

export default function MyCourses() {
  const navigate = useNavigate();
  const { me, courses, myEnrollments, teachersById } = useApp();

  if (!me || me.role !== 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Sign in as a Student</h2>
          <p className="text-muted-foreground mb-6">
            You need to be logged in as a student to view your courses
          </p>
          <Button onClick={() => navigate("/login")}>Sign In</Button>
        </div>
      </div>
    );
  }

  const enrolledCourses = courses.filter((c) => myEnrollments.has(c.id));

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-accent/30 to-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-4xl font-bold mb-4">My Courses</h1>
          <p className="text-muted-foreground text-lg">
            {enrolledCourses.length} enrolled course{enrolledCourses.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {enrolledCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
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
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No enrolled courses yet</h3>
            <p className="text-muted-foreground mb-6">
              Browse the catalog to find courses and start learning
            </p>
            <Button onClick={() => navigate("/catalog")}>
              Browse Catalog
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
