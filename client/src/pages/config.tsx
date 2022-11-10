import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { PageHeader } from '@/components/layouts/PageHeader';
import { PageMain } from '@/components/layouts/PageMain';

const ConfigPanel = dynamic(() => import('@/features/config/components/ConfigPanel').then((module) => module.ConfigPanel), {
  ssr: false,
});

type IndexPageProps = IndexServerSideProps;

const IndexPage = ({ auth }: IndexPageProps) => {
  return (
    <>
      <PageHeader />
      <PageMain>
        <ConfigPanel />
      </PageMain>
    </>
  );
};

export default IndexPage;

type IndexServerSideProps = PageProps;

export const getServerSideProps: GetServerSideProps<IndexServerSideProps> = async (context) => {
  const { props, redirect } = await getAuth(context, true);

  return {
    redirect,
    props: props,
  };
};
