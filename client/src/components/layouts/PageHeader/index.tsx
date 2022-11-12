import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { useAuth } from '@/providers/auth';
import { PagePath } from '@/commons/constant';
import { useLogin } from '@/features/login/hooks/login';
import { MaterialIcon } from '@/components/elements/MaterialIcon';

type PageHeaderProps = {
  plain?: boolean;
};

export const PageHeader = ({ plain = false }: PageHeaderProps) => {
  const router = useRouter();
  const auth = useAuth();
  const { executeLogout } = useLogin();

  const onClickLoginButton = useCallback(() => {
    router.push(PagePath.Login);
  }, [router]);

  const onClickSignupButton = useCallback(() => {
    router.push(PagePath.Signup);
  }, [router]);

  const onClickConfigButton = useCallback(() => {
    router.push(PagePath.Config);
  }, [router]);

  const onClickHomeButton = useCallback(() => {
    router.push(PagePath.Index);
  }, []);

  const onClickLogoutButton = useCallback(() => {
    executeLogout();
  }, []);

  return (
    <header className={'flexible-justify h-header bg-primary px-2'}>
      <div>
        <h1 className={'indent-2 text-xl font-bold'}>Study Hack</h1>
      </div>
      {!plain && (
        <div className={'flexible'}>
          {auth ? (
            <>
              <div>
                <span className={'font-bold'}>{auth.user.name}</span>
                <span className={'px-2'}>さん</span>
              </div>
              <div className={'flexible-center'}>
                {router.pathname !== PagePath.Config && (
                  <MaterialIcon onClick={onClickConfigButton} className={'mx-2 text-3xl'}>
                    settings
                  </MaterialIcon>
                )}
                {router.pathname !== PagePath.Index && (
                  <MaterialIcon onClick={onClickHomeButton} className={'mx-2 text-3xl'}>
                    home
                  </MaterialIcon>
                )}
                <MaterialIcon onClick={onClickLogoutButton} className={'mx-2 text-3xl'}>
                  logout
                </MaterialIcon>
              </div>
            </>
          ) : (
            <>
              <PrimaryButton className={'mr-1 w-[120px] font-bold'} onClick={onClickLoginButton}>
                ログイン
              </PrimaryButton>
              <PrimaryButton className={'w-[120px] font-bold'} onClick={onClickSignupButton}>
                新規登録
              </PrimaryButton>
            </>
          )}
        </div>
      )}
    </header>
  );
};
