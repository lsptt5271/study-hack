import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
      suspense: true,
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});
