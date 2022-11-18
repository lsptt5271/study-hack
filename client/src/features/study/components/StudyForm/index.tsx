import { FormField } from '@/components/elements/FormField';
import { SelectBox } from '@/components/elements/SelectBox';
import { Textbox } from '@/components/elements/Textbox';
import { useCategoriesStore } from '@/features/category/hooks/store';
import { useMenusStore } from '@/features/menu/hooks/store';
import { useForm } from 'react-hook-form';

type StudyFormState = {
  memo: string;
  category: string;
  menu: string;
  startAt: string;
  endAt: string;
};

export const StudyForm = () => {
  const { categories } = useCategoriesStore();
  const { menus } = useMenusStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudyFormState>({
    mode: 'onChange',
  });

  return (
    <form>
      <FormField>
        <div>カテゴリー</div>
        <SelectBox className={'w-full'}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </SelectBox>
      </FormField>
      <FormField>
        <div>メニュー</div>
        <SelectBox className={'w-full'}>
          {menus.map((menu) => (
            <option key={menu.id} value={menu.id}>
              {menu.name}
            </option>
          ))}
        </SelectBox>
      </FormField>
      <FormField>
        <div>開始日時</div>
        <Textbox type="datetime-local" className={'w-full'} {...register('startAt')} />
        {errors.startAt?.message && <div className={'text-red-600'}>{errors.startAt.message}</div>}
      </FormField>
      <FormField>
        <div>終了日時</div>
        <Textbox type="datetime-local" className={'w-full'} {...register('endAt')} />
        {errors.endAt?.message && <div className={'text-red-600'}>{errors.endAt.message}</div>}
      </FormField>
      <FormField>
        <div>メモ</div>
        <Textbox className={'w-full'} {...register('memo')} />
        {errors.memo?.message && <div className={'text-red-600'}>{errors.memo.message}</div>}
      </FormField>
    </form>
  );
};
