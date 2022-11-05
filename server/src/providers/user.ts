import { hashSync } from 'bcrypt';

import client from '@/providers/client';
import { CreateUserInput } from '@/graphqls/resolvers/type';

const userProvider = () => {
  const findOneByLoginId = async (loginId: string) => {
    return await client.user.findUnique({
      where: {
        login_id: loginId,
      },
    });
  };

  const create = async (data: CreateUserInput) => {
    const user = await client.user.create({
      data: {
        name: data.name,
        login_id: data.loginId,
        login_password: hashSync(data.loginPassword, 10),
      },
    });

    if (user) {
      return user;
    } else {
      throw new Error('failed to create user');
    }
  };

  return { findOneByLoginId, create };
};

export default userProvider;
