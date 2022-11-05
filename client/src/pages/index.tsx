import { GetServerSideProps } from 'next';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { PageHeader } from '@/components/layouts/PageHeader';
import { PageMain } from '@/components/layouts/PageMain';

type IndexPageProps = IndexServerSideProps;

const IndexPage = ({ auth }: IndexPageProps) => {
  return (
    <>
      <PageHeader />
      <PageMain>メイン</PageMain>
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
