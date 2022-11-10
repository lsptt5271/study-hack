import { Auth } from '@/@types';
import { atom, useAtom } from 'jotai';
import { ReactNode, useEffect } from 'react';

type AuthProviderProps = {
  auth: Auth | null;
  children: ReactNode;
};

let _auth: Auth | null = null;

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
