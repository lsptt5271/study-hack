import { ChangeEvent, FormEvent, useCallback } from 'react';
import { useRouter } from 'next/router';

import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { Textbox } from '@/components/elements/Textbox';
import { useLogin } from '@/features/login/hooks/login';
import { PagePath } from '@/commons/constant';
import { LoginHint } from '../LoginHint';

export const LoginForm = () => {
  const router = useRouter();
  const { loginVariables, setLoginVariables, executeLogin } = useLogin();

  const onChageLoginId = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginVariables((state) => ({
        ...state,
        loginId: e.target.value,
      }));
    },
    [setLoginVariables]
  );

  const onChangeLoginPassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setLoginVariables((state) => ({
        ...state,
        loginPassword: e.target.value,
      }));
    },
    [setLoginVariables]
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      executeLogin();
    },
    [executeLogin]
  );

  return (
    <form onSubmit={onSubmit} className={'w-[360px] rounded-lg bg-primary p-8'}>
      <div className={'mb-2'}>
        <LoginHint />
      </div>
      <div className={'mb-2'}>
        <p>ユーザID</p>
        <Textbox className="w-full" value={loginVariables.loginId} onChange={onChageLoginId} />
      </div>
      <div className={'mb-4'}>
        <p>パスワード</p>
        <Textbox type="password" className="w-full" value={loginVariables.loginPassword} onChange={onChangeLoginPassword} />
      </div>
      <div className={'mb-4'}>
        <PrimaryButton className="w-full">ログイン</PrimaryButton>
      </div>
      <div className={'text-right'}>
        <p className={'cursor-pointer underline'} onClick={() => router.push(PagePath.Signup)}>
          アカウントをお持ちでない方
        </p>
      </div>
    </form>
  );
};
