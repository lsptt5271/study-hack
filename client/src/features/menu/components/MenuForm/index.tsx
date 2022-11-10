import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@/components/elements/FormField';
import { Textbox } from '@/components/elements/Textbox';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useCreateMenuMutation } from '@/repositories/graphql';
import { useMenuModal } from '@/features/menu/components/MenuModal/hook';
import { useGetCategories } from '@/features/category/hooks/query';
import { useSelectedCategory } from '@/features/category/hooks/selected-category';

export type MenuFormHandles = {
  submit(): void;
};

type MenuFormState = {
  name: string;
  image: FileList;
};

type MenuFormProps = {};

export const MenuForm = forwardRef<MenuFormProps>(({}, ref) => {
  const auth = useAuth();
  const { hideMenuModal } = useMenuModal();
  const mutation = useCreateMenuMutation(getGraphqlClient(auth));
  const { getCategoriesQuery } = useGetCategories();
  const { selectedCategoryId } = useSelectedCategory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuFormState>({
    mode: 'onChange',
  });

  useImperativeHandle(ref, () => ({
    submit: handleSubmit((data) => {
      if (!auth) return;

      console.log(data);

      mutation
        .mutateAsync({
          input: {
            name: data.name,
            image: data.image[0],
            categoryId: selectedCategoryId,
          },
        })
        .then(() => getCategoriesQuery.refetch())
        .then(() => hideMenuModal());
    }),
  }));

  return (
    <form>
      <FormField>
        <div>メニュー名</div>
        <Textbox className={'w-full'} {...register('name', { required: 'メニュー名を入力してください。' })} />
        {errors.name?.message && <div className={'text-red-600'}>{errors.name.message}</div>}
      </FormField>
      <FormField>
        <div>サムネイル画像</div>
        <Textbox type="file" className={'w-full bg-white'} {...register('image')} />
      </FormField>
    </form>
  );
});

MenuForm.displayName = 'MenuForm';
