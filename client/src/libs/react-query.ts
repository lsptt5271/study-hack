import { QueryClient } from 'react-query';

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
