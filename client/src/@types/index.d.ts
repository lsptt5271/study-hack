export type User = {
  id: number;
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
