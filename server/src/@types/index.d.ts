export type User = {
  id: number;
  name: string;
  loginId: string;
};

export type JwtPayload = {
  user: User;
  exp: number;
  iat: number;
};
