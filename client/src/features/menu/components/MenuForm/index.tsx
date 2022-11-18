import { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

import { FormField } from '@/components/elements/FormField';
import { Textbox } from '@/components/elements/Textbox';
import { getGraphqlClient } from '@/libs/graphql-client';
import { useAuth } from '@/providers/auth';
import { useCreateMenuMutation } from '@/repositories/graphql';
import { useMenuModal } from '@/features/menu/components/MenuModal/hook';
import { useCustomGetCategoriesQuery } from '@/features/category/hooks/query';
import { SelectBox } from '@/components/elements/SelectBox';
import { useCategoriesStore } from '@/features/category/hooks/store';

export type MenuFormHandles = {
  submit(): void;
};

type MenuFormState = {
  name: string;
  category: string;
  image: FileList;
};

type MenuFormProps = {};

export const MenuForm = forwardRef<MenuFormProps>(({}, ref) => {
  const auth = useAuth();
  const { hideMenuModal } = useMenuModal();
  const mutation = useCreateMenuMutation(getGraphqlClient(auth));
  const { categories } = useCategoriesStore();
  const getCategoriesQuery = useCustomGetCategoriesQuery();

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

      mutation
        .mutateAsync({
          input: {
            name: data.name,
            image: data.image[0],
            categoryId: parseInt(data.category),
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
        <div>カテゴリー</div>
        <SelectBox className={'w-full'} {...register('category')}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SelectBox>
      </FormField>
      <FormField>
        <div>サムネイル画像</div>
        <Textbox type="file" className={'w-full bg-white'} {...register('image')} />
      </FormField>
    </form>
  );
});

MenuForm.displayName = 'MenuForm';
