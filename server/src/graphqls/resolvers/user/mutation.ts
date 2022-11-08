import { sign } from '@/auths/jwt';
import userProvider from '@/providers/user';
import { MutationResolvers } from '../type';

export const createUserMutationResolver: MutationResolvers['createUser'] = async (source, args, context) => {
  const { create } = userProvider();

  const user = await create(args.input);

  return sign({
    id: user.id,
    name: user.name,
    loginId: user.login_id,
  });
};
