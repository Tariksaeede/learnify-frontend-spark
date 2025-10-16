import { User, Course } from "@/types";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Esma",
    surname: "Sönmez",
    dateOfBirth: "2001-05-17",
    gender: 1,
    email: "esma@example.com",
    passwordHash: "***",
    role: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Qais",
    surname: "Hassan",
    email: "qais@example.com",
    passwordHash: "***",
    role: 0,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Muhammed",
    surname: "Merdun",
    email: "merdun@example.com",
    passwordHash: "***",
    role: 1,
    createdAt: new Date().toISOString(),
  },
];

export const mockCourses: Course[] = [
  {
    id: 1,
    teacherId: 1,
    title: "ASP.NET Core for Beginners",
    description:
      "Build modern web apps with ASP.NET Core. Controllers, EF Core, and deployment.",
    basePrice: 49.99,
    type: 0,
    scheduleUtc: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
    maxCapacity: 50,
    meetingLink: "https://teams.microsoft.com/l/aspnet",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop",
    status: 1,
  },
  {
    id: 2,
    teacherId: 3,
    title: "SQL Schema Design Essentials",
    description:
      "Normalization, constraints, and indexing. Hands-on with real-world schemas.",
    basePrice: 29.0,
    type: 1,
    scheduleUtc: null,
    maxCapacity: null,
    meetingLink: null,
    imageUrl: "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?q=80&w=1200&auto=format&fit=crop",
    status: 1,
  },
  {
    id: 3,
    teacherId: 1,
    title: "Live: System Design for Juniors",
    description: "Whiteboard fundamentals, trade-offs, and estimation.",
    basePrice: 0,
    type: 0,
    scheduleUtc: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    maxCapacity: 200,
    meetingLink: "https://meet.google.com/learnify-system-design",
    imageUrl: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop",
    status: 1,
  },
];

export const initialEnrollments: Record<number, Set<number>> = { 
  2: new Set([1]) 
};
