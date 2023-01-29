import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@/components/elements/FormField';
import { Textbox } from '@/components/elements/Textbox';
import { useAuth } from '@/providers/auth';
import { useCategoryModal } from '@/features/category/components/CategoryModal/hook';
import { createCateogryMutationAtom } from '@/features/category/hooks/api';
import { useAtomValue } from 'jotai';

export type CategoryFormHandles = {
  submit(): void;
};

type CategoryFormState = {
  name: string;
};

type CategoryFormProps = {};

export const CategoryForm = forwardRef<CategoryFormProps>(({}, ref) => {
  const auth = useAuth();
  const { hideCategoryModal } = useCategoryModal();
  const createCategoryMutation = useAtomValue(createCateogryMutationAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormState>({
    mode: 'onChange',
  });

  useImperativeHandle(ref, () => ({
    submit: handleSubmit((data) => {
      if (!auth) return;

      createCategoryMutation
        .mutate({
          input: {
            name: data.name,
          },
        })
        .then(() => hideCategoryModal());
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
