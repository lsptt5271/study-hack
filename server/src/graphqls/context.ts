import dataLoader from './dataloader';

export const context = () => {
  return {
    loader: dataLoader,
  };
};

export type Context = ReturnType<typeof context>;

export default context;
