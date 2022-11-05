import { Auth } from '@/@types';
import { ReactNode } from 'react';

type AuthProviderProps = {
  auth?: Auth | null;
  children: ReactNode;
};

let _auth: Auth | null;

export const useAuth = () => {
  return _auth;
};

export const AuthProvider = ({ auth, children }: AuthProviderProps) => {
  if (auth) {
    _auth = auth;
  } else {
    _auth = null;
  }

  return <>{children}</>;
};
