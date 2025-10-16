import React, { createContext, useContext, useState, useMemo } from "react";
import { User, Course } from "@/types";
import { mockUsers, mockCourses, initialEnrollments } from "@/lib/mockData";

type AppContextType = {
  me: User | null;
  setMe: (user: User | null) => void;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  enrollments: Record<number, Set<number>>;
  setEnrollments: React.Dispatch<React.SetStateAction<Record<number, Set<number>>>>;
  myEnrollments: Set<number>;
  teachersById: Map<number, User>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [me, setMe] = useState<User | null>(mockUsers[1]); // Default: Student
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [enrollments, setEnrollments] = useState<Record<number, Set<number>>>(initialEnrollments);

  const myEnrollments = useMemo(
    () => (me ? enrollments[me.id] ?? new Set<number>() : new Set<number>()),
    [me, enrollments]
  );

  const teachersById = useMemo(() => {
    const m = new Map<number, User>();
    mockUsers.forEach((u) => m.set(u.id, u));
    return m;
  }, []);

  return (
    <AppContext.Provider
      value={{
        me,
        setMe,
        courses,
        setCourses,
        enrollments,
        setEnrollments,
        myEnrollments,
        teachersById,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
