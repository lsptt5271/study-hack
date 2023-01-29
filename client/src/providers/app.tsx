import { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClientAtom } from 'jotai-tanstack-query';
import { Provider } from 'jotai';

import { Auth } from '@/@types';
import { queryClient, useQueryClient } from '@/libs/react-query';

type AppProviderProps = {
  auth: Auth | null;
  children: ReactNode;
};

export const AppProvider = ({ auth, children }: AppProviderProps) => {
  const providedQueryClient = useQueryClient();

  return (
    <Provider initialValues={[[queryClientAtom, queryClient]] as const}>
      <QueryClientProvider client={providedQueryClient}>
        <ReactQueryDevtools />
        {children}
      </QueryClientProvider>
    </Provider>
  );
};
