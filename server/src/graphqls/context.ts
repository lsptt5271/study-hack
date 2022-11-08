import { User } from '@/@types';
import dataLoader from './dataloader';

export const context = (user: User | null) => {
  return {
    user: user,
    loader: dataLoader,
  };
};

export type Context = ReturnType<typeof context>;

export default context;
