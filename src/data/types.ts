export interface User {
  userID: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
}

export interface Job {
  jobId: number;
  userId: string;
  jobPosition: string;
  company: string;
  salary: string;
  location: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface authProfile {
  given_name: string;
  family_name: string;
  nickname: string;
  name: string;
  picture: string;
  updated_at: string; // ISO timestamp as string
  email: string;
  email_verified: boolean;
  sub: string;
  sid: string;
}
