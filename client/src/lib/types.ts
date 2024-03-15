export type SignupResponse =
  | { data?: { email: string; id: string }; error?: string }
  | undefined;

export type SigninResponse = SignupResponse;

export type EditEmailFormResponse =
  | { data?: { email?: string; success: true }; error?: string }
  | undefined;

export type EditPasswordFormResponse = EditEmailFormResponse;

// entities
type User = {
  id: string;
  email: string;
  password: string;
  created_at: Date;
  projects: Array<Project>;
};
export type UserWithoutPassword = Omit<User, "password">;

export type Project = {
  id: string;
  title: string;
  deleted_at: Date | null;
  owner: User;
  owner_id: User["id"];
  features: Array<Feature>;
};

export enum FeatureStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  DONE = "done",
}

export type Feature = {
  id: string;
  description: string;
  project: Project;
  project_id: Project["id"];
  status: FeatureStatus;
  tasks: Array<Task>;
};

export type Task = {
  id: string;
  content: string;
  updated_at: Date;
  feature: Feature;
  feature_id: string;
  is_completed: boolean;
};
