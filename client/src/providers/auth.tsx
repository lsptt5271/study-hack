import { Auth } from '@/@types';
import { ReactNode } from 'react';

type AuthProviderProps = {
  auth?: Auth | null;
  children: ReactNode;
};

let _auth: Auth;

const useAuth = () => {
  return _auth;
};

export const AuthProvider = ({ auth, children }: AuthProviderProps) => {
  if (auth) {
    _auth = auth;
  }

  return <>{children}</>;
};
