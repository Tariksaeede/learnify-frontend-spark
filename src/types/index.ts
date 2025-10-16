export type Role = 0 | 1 | 2; // 0 Student, 1 Teacher, 2 Admin

export type User = {
  id: number;
  name: string;
  surname?: string;
  dateOfBirth?: string;
  gender?: 0 | 1;
  email: string;
  passwordHash: string;
  role: Role;
  createdAt: string;
};

export type Course = {
  id: number;
  teacherId: number;
  title: string;
  description?: string;
  basePrice: number;
  type: 0 | 1; // 0 Live, 1 Recorded
  scheduleUtc?: string | null;
  maxCapacity?: number | null;
  meetingLink?: string | null;
  imageUrl?: string | null;
  status: 0 | 1; // 0 Inactive, 1 Active
};
