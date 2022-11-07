import { FormField } from '@/components/elements/FormField';
import { Textbox } from '@/components/elements/Textbox';
import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

export type CategoryFormHandles = {
  submit(): void;
};

type CategoryFormState = {
  name: string;
};

type CategoryFormProps = {};

export const CategoryForm = forwardRef<CategoryFormProps>(({}, ref) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormState>({
    mode: 'onChange',
  });

  useImperativeHandle(ref, () => ({
    submit: handleSubmit((data) => {
      console.log(data);
    }),
  }));

  return (
    <form>
      <FormField>
        <div>カテゴリー名</div>
        <Textbox className={'w-full'} {...register('name', { required: 'カテゴリー名を入力してください。' })} />
        {errors.name?.message && <div className={'text-red-600'}>{errors.name.message}</div>}
      </FormField>
    </form>
  );
});

CategoryForm.displayName = 'CategoryForm';
