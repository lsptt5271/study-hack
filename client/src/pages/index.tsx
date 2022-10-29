import { GetServerSideProps } from 'next';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';

type IndexPageProps = IndexServerSideProps;

const IndexPage = ({auth}: IndexPageProps) => {
  return <div>aaa</div>;
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
