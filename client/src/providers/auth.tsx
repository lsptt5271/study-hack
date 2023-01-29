import { Auth } from '@/@types';
import { atom, Provider, useAtom, useAtomValue } from 'jotai';
import { ReactNode, useEffect } from 'react';
import { useHydrateAtoms } from 'jotai/utils';

type AuthProviderProps = {
  auth: Auth | null;
  children: ReactNode;
};

export const authAtom = atom<Auth | null>(null);

export const useAuth = () => {
  const auth = useAtomValue(authAtom);

  return auth;
};

export const AuthProvider = ({ auth, children }: AuthProviderProps) => {
  return <Provider initialValues={[[authAtom, auth]] as const}>{children}</Provider>;
};
