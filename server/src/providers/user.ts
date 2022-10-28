import client from '@/providers/client';

const userProvider = () => {
  const findOneByLoginId = async (loginId: string) => {
    return await client.user.findUniqueOrThrow({
      where: {
        login_id: loginId,
      },
    });
  };

  return { findOneByLoginId };
};

export default userProvider;
