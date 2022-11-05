import { GetServerSideProps } from 'next';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { LoginForm } from '@/features/login/components/LoginForm';
import { PageMain } from '@/components/layouts/PageMain';
import { PageHeader } from '@/components/layouts/PageHeader';

const LoginPage = () => {
  return (
    <>
      <PageHeader plain={true} />
      <PageMain>
        <section className={'flexible-center h-full'}>
          <LoginForm />
        </section>
      </PageMain>
    </>
  );
};

export default LoginPage;

type LoginServerSideProps = PageProps;

export const getServerSideProps: GetServerSideProps<LoginServerSideProps> = async (context) => {
  const { props, redirect } = await getAuth(context, false);

  return {
    redirect,
    props: props,
  };
};
