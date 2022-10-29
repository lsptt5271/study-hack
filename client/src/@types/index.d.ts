export type User = {
  name: string;
  login_id: string;
};

export type AuthResponse = {
  user: User;
  iat: number;
  exp: number;
};

export type Auth = AuthResponse & {
  token: string;
};
