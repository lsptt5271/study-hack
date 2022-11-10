import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@/components/elements/FormField';
import { Textbox } from '@/components/elements/Textbox';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useCreateCategoryMutation } from '@/repositories/graphql';
import { useCategoryModal } from '@/features/category/components/CategoryModal/hook';
import { useGetCategories } from '@/features/category/hooks/query';

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
  const mutation = useCreateCategoryMutation(getGraphqlClient(auth));
  const { getCategoriesQuery } = useGetCategories();

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

      mutation
        .mutateAsync({
          input: {
            name: data.name,
          },
        })
        .then(() => getCategoriesQuery.refetch())
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
