import { useRouter } from 'next/router';
import { setCookie } from 'nookies';
import { useForm } from 'react-hook-form';

import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { Textbox } from '@/components/elements/Textbox';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useRegisterUserMutation } from '@/repositories/graphql';

type SignupFormState = {
  name: string;
  loginId: string;
  loginPassword: string;
};

type SignupFormProps = {};

export const SignupForm = ({}: SignupFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormState>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutateAsync({
      input: data,
    }).then((data) => {
      setCookie(null, 'accessToken', data.createUser.token, {
        expires: new Date(data.createUser.exp * 1000),
      });

      router.push('/');
    });
  });

  const mutation = useRegisterUserMutation(getGraphqlClient());

  return (
    <form onSubmit={onSubmit} className={'w-[360px] rounded-lg bg-primary p-8'}>
      <div>
        <p>ユーザID</p>
        <Textbox className="w-full" {...register('loginId', { required: '必須項目です。', maxLength: { value: 10, message: '10文字以内です。' } })} />
      </div>
      <div>
        <p>ニックネーム</p>
        <Textbox className="w-full" {...register('name', { required: true, maxLength: 30 })} />
      </div>
      <div>
        <p>パスワード</p>
        <Textbox type="password" className="w-full" {...register('loginPassword', { required: true, maxLength: 30 })} />
      </div>
      <div>
        <p>{errors.loginId?.message}</p>
      </div>
      <div>
        <PrimaryButton className={'w-full'}>登録</PrimaryButton>
      </div>
    </form>
  );
};
