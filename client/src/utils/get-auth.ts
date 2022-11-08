import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

import axios from '@/libs/axios';
import { AuthResponse } from '@/@types';
import { PagePath } from '@/commons/constant';

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
      redirect:
        context.resolvedUrl === PagePath.Index
          ? undefined
          : {
              permanent: false,
              destination: PagePath.Index,
            },
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
          destination: PagePath.Login.concat('?status=session'),
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
