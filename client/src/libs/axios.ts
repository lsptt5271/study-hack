import Axios from 'axios';

import { ApiDestination } from '@/commons/constant';

const axios = Axios.create({
  baseURL: ApiDestination,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios;
