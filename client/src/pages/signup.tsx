import { GetServerSideProps } from 'next';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { SignupForm } from '@/features/signup/components/SignupForm';
import { PageHeader } from '@/components/layouts/PageHeader';
import { PageMain } from '@/components/layouts/PageMain';

type SignupPageProps = SignupServerSideProps;

const SignupPage = ({ auth }: SignupPageProps) => {
  return (
    <>
      <PageHeader />
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
