import { GetServerSideProps } from 'next';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { PrimaryButton } from '@/components/elements/PrimaryButton';

type IndexPageProps = IndexServerSideProps;

const IndexPage = ({ auth }: IndexPageProps) => {
  return (
    <>
      <header>
        <PrimaryButton>ログイン</PrimaryButton>
        <PrimaryButton>新規登録</PrimaryButton>
      </header>
      <main></main>
    </>
  );
};

export default IndexPage;

type IndexServerSideProps = PageProps;

export const getServerSideProps: GetServerSideProps<IndexServerSideProps> = async (context) => {
  const { props, redirect } = await getAuth(context, false);

  return {
    redirect,
    props: props,
  };
};
