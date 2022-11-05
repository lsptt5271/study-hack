import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { useAuth } from '@/providers/auth';

export const PageHeader = () => {
  const router = useRouter();
  const auth = useAuth();

  const onClickLoginButton = useCallback(() => {
    router.push('/login');
  }, [router]);

  const onClickSignupButton = useCallback(() => {
    router.push('/signup');
  }, [router]);

  return (
    <header className={'flexible h-header bg-primary px-2'}>
      <div className={'ml-auto mr-0'}>
        {auth ? (
          <>
            <div>
              <span>{auth.user.name}</span>
              <span className={'px-2'}>さん</span>
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
    </header>
  );
};
