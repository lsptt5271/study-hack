export const LoadingMask = () => {
  return (
    <div
      className={
        'flexible-center h-full w-full bg-mask after:h-[40px] after:w-[40px] after:animate-loading after:rounded-[50%] after:border-[4px] after:border-loading after:border-r-white'
      }
    ></div>
  );
};
