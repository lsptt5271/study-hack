import { QueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { queryClientAtom } from 'jotai-tanstack-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 500,
      cacheTime: 0,
      suspense: true,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

export const useQueryClient = () => {
  const queryClient = useAtomValue(queryClientAtom);

  return queryClient;
};
