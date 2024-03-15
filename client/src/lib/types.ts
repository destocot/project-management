export type SignupResponse =
  | { data?: { email: string; id: string }; error?: string }
  | undefined;

export type SigninResponse = SignupResponse;

export type EditEmailFormResponse =
  | { data?: { email?: string; success: true }; error?: string }
  | undefined;

export type EditPasswordFormResponse = EditEmailFormResponse;

export type Project = {
  id: string;
  title: string;
  owner_id: string;
  deleted_at: Date | null;
};
