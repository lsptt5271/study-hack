import DataLoader from 'dataloader';
import _ from 'lodash';

import { getMenusByCategoryId } from '@/services/menu';
import { MenuModel } from '@/graphqls/model';

const getMenusByCategoryIdDataLoader = new DataLoader<number, MenuModel[]>((keys) => {
  return Promise.all(keys.map((key) => getMenusByCategoryId(key)));
});

export default {
  getMenusByCategoryIdDataLoader,
};
