import { sign } from '@/auths/jwt';
import userProvider from '@/providers/user';
import { MutationResolvers } from '../type';

export const createUserMutationResolver: MutationResolvers['createUser'] = async (source, variables) => {
  const { create } = userProvider();

  const user = await create(variables.input);

  return sign({
    name: user.name,
    loginId: user.login_id,
  });
};
