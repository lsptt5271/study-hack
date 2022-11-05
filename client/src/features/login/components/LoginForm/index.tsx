import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { Textbox } from '@/components/elements/Textbox';
import { ChangeEvent, FormEvent, useCallback } from 'react';
import { useLogin } from '../../hooks/login';

export const LoginForm = () => {
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
      <div>
        <p>ユーザID</p>
        <Textbox className="w-full" value={loginVariables.loginId} onChange={onChageLoginId} />
      </div>
      <div>
        <p>パスワード</p>
        <Textbox type="password" className="w-full" value={loginVariables.loginPassword} onChange={onChangeLoginPassword} />
      </div>
      <div>
        <PrimaryButton className="w-full">ログイン</PrimaryButton>
      </div>
    </form>
  );
};
