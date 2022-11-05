import { useRouter } from 'next/router';
import { useMemo } from 'react';

const LoginStatus = {
  Session: 'session',
  Error: 'error',
  Logout: 'logout',
} as const;

type LoginStatus = typeof LoginStatus[keyof typeof LoginStatus];

export const LoginHint = () => {
  const router = useRouter();

  const hint = useMemo(() => {
    const status = router.query.status as LoginStatus | undefined;

    switch (status) {
      case LoginStatus.Session:
        return {
          message: 'セッションの有効期限が切れています。再度ログインしてください。',
          error: true,
        };
      case LoginStatus.Error:
        return {
          message: 'ユーザIDまたはパスワードが違います。',
          error: true,
        };
      case LoginStatus.Logout:
        return {
          message: 'ログアウトしました。',
          error: false,
        };
      default:
        null;
    }
  }, [router]);

  return <>{hint && <p className={hint.error ? 'text-red-600' : ''}>{hint.message}</p>}</>;
};
