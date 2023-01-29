import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useCallback } from 'react';

import { PrimaryButton } from '@/components/elements/PrimaryButton';
import { Textbox } from '@/components/elements/Textbox';
import setAccessToken from '@/utils/set-access-token';
import { PagePath } from '@/commons/constant';
import { SignupFormError } from '@/features/signup/components/SignupFormError';
import axios from '@/libs/axios';
import { useAtomValue } from 'jotai';
import { registerUserMutationAtom } from '../../hooks/api';

type SignupFormState = {
  name: string;
  loginId: string;
  loginPassword: string;
};

type SignupFormProps = {};

export const SignupForm = ({}: SignupFormProps) => {
  const router = useRouter();
  const registerUserMutation = useAtomValue(registerUserMutationAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormState>({
    mode: 'onChange',
  });

  const onSubmit = handleSubmit((data) => {
    registerUserMutation
      .mutate({
        input: data,
      })
      .then((data) => {
        setAccessToken(data.createUser);

        router.push(PagePath.Index);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  const hasWhiteSpace = useCallback((value: string) => {
    if (value.indexOf(' ') !== -1 || value.indexOf(' ') !== -1) {
      return '空白は使用できません。';
    } else {
      return true;
    }
  }, []);

  const validateLoginId = useCallback(async (value: string) => {
    const whiteSpaceValidation = hasWhiteSpace(value);

    if (whiteSpaceValidation === true) {
      if (await axios.post<never, boolean>('/validate-signup', { loginId: value })) {
        return true;
      } else {
        return 'このユーザIDは既に使用されています。';
      }
    } else {
      return whiteSpaceValidation;
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className={'w-[360px] rounded-lg bg-primary p-8'}>
      <div className={'mb-4'}>
        <h2 className={'text-center text-xl'}>新規登録</h2>
      </div>
      <div className={'mb-2'}>
        <p className={'py-1'}>ユーザID</p>
        <Textbox
          className="w-full"
          {...register('loginId', {
            validate: async (value) => await validateLoginId(value),
            required: 'ユーザIDを入力してください。',
            maxLength: { value: 30, message: 'ユーザ`IDは30文字以内で入力してください。' },
          })}
        />
        {errors.loginId?.message && <SignupFormError>{errors.loginId.message}</SignupFormError>}
      </div>
      <div className={'mb-2'}>
        <p className={'py-1'}>ニックネーム</p>
        <Textbox
          className="w-full"
          {...register('name', {
            validate: (value) => hasWhiteSpace(value),
            required: 'ニックネームを入力してください。',
            maxLength: { value: 30, message: 'ニックネームは30文字以内で入力してください。' },
          })}
        />
        {errors.name?.message && <SignupFormError>{errors.name.message}</SignupFormError>}
      </div>
      <div className={'mb-4'}>
        <p className={'py-1'}>パスワード</p>
        <Textbox
          type="password"
          className="w-full"
          {...register('loginPassword', {
            validate: (value) => hasWhiteSpace(value),
            required: 'パスワードを入力してください。',
            maxLength: { value: 30, message: 'パスワードは30文字以内で入力してください。' },
          })}
        />
        {errors.loginPassword?.message && <SignupFormError>{errors.loginPassword.message}</SignupFormError>}
      </div>
      <div className={'mb-4'}>
        <PrimaryButton className={'w-full'}>登録</PrimaryButton>
      </div>
      <div className={'text-right'}>
        <p className={'cursor-pointer underline'} onClick={() => router.push(PagePath.Login)}>
          アカウントをお持ちの方
        </p>
      </div>
    </form>
  );
};
