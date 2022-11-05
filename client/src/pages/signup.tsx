import { GetServerSideProps } from 'next';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { SignupForm } from '@/features/signup/components/SignupForm';
import { PageMain } from '@/components/layouts/PageMain';
import { PageHeader } from '@/components/layouts/PageHeader';

const SignupPage = () => {
  return (
    <>
      <PageHeader plain={true} />
      <PageMain>
        <section className={'flexible-center h-full'}>
          <SignupForm />
        </section>
      </PageMain>
    </>
  );
};

export default SignupPage;

type SignupServerSideProps = PageProps;

export const getServerSideProps: GetServerSideProps<SignupServerSideProps> = async (context) => {
  const { props, redirect } = await getAuth(context, false);

  return {
    redirect,
    props: props,
  };
};
