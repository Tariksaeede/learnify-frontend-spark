import { Course, User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatMoney, formatLocalDateTime } from "@/lib/formatters";
import { Calendar, Video } from "lucide-react";

type CourseCardProps = {
  course: Course;
  teacher: User;
  onClick: () => void;
};

export function CourseCard({ course, teacher, onClick }: CourseCardProps) {
  const isLive = course.type === 0;

  return (
    <div
      className="group rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 transition-all duration-300 cursor-pointer bg-card"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden bg-muted">
        {course.imageUrl ? (
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary-glow/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge variant={isLive ? "default" : "secondary"} className="backdrop-blur-sm">
            {isLive ? (
              <>
                <Video className="w-3 h-3 mr-1" />
                Live
              </>
            ) : (
              "Recorded"
            )}
          </Badge>
          {isLive && course.scheduleUtc && (
            <Badge variant="outline" className="backdrop-blur-sm bg-background/80">
              <Calendar className="w-3 h-3 mr-1" />
              {formatLocalDateTime(course.scheduleUtc)}
            </Badge>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {course.description}
        </p>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">By {teacher.name}</span>
          <span className="text-lg font-bold text-primary">
            {formatMoney(course.basePrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
