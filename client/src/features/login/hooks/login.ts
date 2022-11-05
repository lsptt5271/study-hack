import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { Auth } from '@/@types';
import { PagePath } from '@/commons/constant';
import axios from '@/libs/axios';
import setAccessToken from '@/utils/set-access-token';
import { destroyCookie } from 'nookies';

export type LoginVariables = {
  loginId: string;
  loginPassword: string;
};

export const useLogin = () => {
  const router = useRouter();
  const [loginVariables, setLoginVariables] = useState<LoginVariables>({
    loginId: '',
    loginPassword: '',
  });

  const executeLogin = useCallback(async () => {
    try {
      const data = await axios.post<never, Auth>('/login', loginVariables);

      setAccessToken(data);

      router.push(PagePath.Index);
    } catch (e) {
      console.log(e);

      router.push(PagePath.Login.concat('?status=error'));
    }
  }, [loginVariables, router]);

  const executeLogout = useCallback(() => {
    destroyCookie(null, 'accessToken');

    router.push(PagePath.Login.concat('?status=logout'));
  }, [router]);

  return {
    loginVariables,
    setLoginVariables,
    executeLogin,
    executeLogout,
  };
};
