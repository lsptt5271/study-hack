import { Auth } from '@/@types';
import { AuthProvider } from '@/providers/auth';
import { AppProps } from 'next/app';

export type PageProps = {
  auth?: Auth | null;
};

const App = ({ Component, pageProps }: AppProps) => {
  const props = pageProps as PageProps;

  return (
    <AuthProvider auth={props.auth}>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default App;
