import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Auth } from '@/@types';
import { queryClient } from '@/libs/react-query';
import { AuthProvider } from '@/providers/auth';

type AppProviderProps = {
  auth: Auth | null;
  children: ReactNode;
};

export const AppProvider = ({ auth, children }: AppProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AuthProvider auth={auth}>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
