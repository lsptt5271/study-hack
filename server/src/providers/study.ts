import client from '@/providers/client';

const studyProvider = () => {
  const findAll = async () => {
    return await client.study.findMany();
  };

  return { findAll };
};

export default studyProvider;
