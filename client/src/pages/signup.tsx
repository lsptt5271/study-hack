import { GetServerSideProps } from 'next';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { SignupForm } from '@/features/signup/components/SignupForm';

type SignupPageProps = SignupServerSideProps;

const SignupPage = ({ auth }: SignupPageProps) => {
  return (
    <>
      <header></header>
      <main>
        <SignupForm />
      </main>
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
