export type SignupResponse =
  | { data?: { email: string; id: string }; error?: string }
  | undefined;

export type SigninResponse = SignupResponse;
