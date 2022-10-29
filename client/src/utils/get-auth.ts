import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import axios from '@/libs/axios';
import { AuthResponse } from '@/@types';

const getAuth = async (context: GetServerSidePropsContext, redirectOnFail: boolean) => {
  const cookies = parseCookies(context);
  const token = cookies.accessToken;

  try {
    const auth = await axios.post<never, AuthResponse>('/auth', undefined, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: {
        auth: {
          ...auth,
          token,
        },
      },
    };
  } catch (e) {
    console.log(e);
    if (redirectOnFail) {
      return {
        redirect: {
          permanent: false,
          destination: '/login?status=session',
        },

        props: {} as never,
      };
    } else {
      return {
        props: {
          auth: null,
        },
      };
    }
  }
};

export default getAuth;
