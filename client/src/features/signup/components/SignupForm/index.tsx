import { Textbox } from '@/components/elements/Textbox';
import { useForm } from 'react-hook-form';

type SignupFormState = {
  name: string;
  loginId: string;
  loginPassword: string;
};

type SignupFormProps = {};

export const SignupForm = ({}: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormState>({
    mode: 'onChange',
  });

  return (
    <form>
      <Textbox type="text" {...register('loginId', { required: true, maxLength: 30 })} />
    </form>
  );
};
