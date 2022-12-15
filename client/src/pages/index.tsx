import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import getAuth from '@/utils/get-auth';
import { PageProps } from '@/pages/_app';
import { PageHeader } from '@/components/layouts/PageHeader';
import { PageMain } from '@/components/layouts/PageMain';

const StudyPanel = dynamic<{}>(
  () => import('@/features/study/components/StudyPanel').then((module) => module.StudyPanel),
  {
    ssr: false,
  }
);

type IndexPageProps = IndexServerSideProps;

const IndexPage = ({ auth }: IndexPageProps) => {
  return (
    <>
      <PageHeader />
      <PageMain>{auth ? <StudyPanel /> : <article>トップページ的なもの</article>}</PageMain>
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
