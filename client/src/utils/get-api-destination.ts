import { ApiBasePath, ApiDestination } from '@/commons/constant';

const getApiDestination = () => {
  return typeof window === 'undefined' ? ApiDestination : ApiBasePath;
};
