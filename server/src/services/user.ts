import userProvider from '@/providers/user';

export const isExistUser = async (loginId: string) => {
  const { findOneByLoginId } = userProvider();

  const user = await findOneByLoginId(loginId);

  return !user;
};
