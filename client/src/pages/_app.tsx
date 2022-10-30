import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Auth } from '@/@types';
import { AuthProvider } from '@/providers/auth';

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
