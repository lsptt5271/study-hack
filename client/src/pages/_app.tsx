import { AppProps } from 'next/app';

import '@/styles/globals.css';

import { Auth } from '@/@types';
import { AppProvider } from '@/providers/app';

export type PageProps = {
  auth: Auth | null;
};

const App = ({ Component, pageProps }: AppProps) => {
  const props = pageProps as PageProps;

  return (
    <AppProvider auth={props.auth}>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default App;
