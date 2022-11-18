import dayjs from 'dayjs';

export const date2String = (date: Date): string => {
  return dayjs(date).format('YYYY/MM/DD HH:mm');
};

export const string2Date = (str: string): Date => {
  return dayjs(str, 'YYYY/MM/DD HH:mm').toDate();
};
