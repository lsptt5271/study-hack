export type User = {
  name: string;
  loginId: string;
};

export type AuthResponse = {
  user: User;
  exp: number;
};

export type Auth = AuthResponse & {
  token: string;
};
