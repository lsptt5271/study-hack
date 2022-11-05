import { Auth } from '@/@types';
import axios from '@/libs/axios';
import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useCallback, useState } from 'react';

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

      setCookie(null, 'accessToken', data.token, {
        expires: new Date(data.exp * 1000),
      });

      router.push('/');
    } catch (e) {
      console.log(e);

      router.push('/login?status=error');
    }
  }, [loginVariables]);

  return {
    loginVariables,
    setLoginVariables,
    executeLogin,
  };
};
