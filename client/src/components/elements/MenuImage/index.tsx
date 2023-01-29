import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useAuth } from '@/providers/auth';
import { ApiBasePath } from '@/commons/constant';

type MenuImageProps = {
  menuId: number;
};

export const MenuImage = ({ menuId }: MenuImageProps) => {
  const auth = useAuth();
  const query = useQuery({
    queryKey: ['menu-image', menuId],
    queryFn: async () => {
      const response = await axios.get<ArrayBuffer>(`/menus/${menuId}/image`, {
        baseURL: ApiBasePath,
        responseType: 'arraybuffer',
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });

      return {
        base64: Buffer.from(response.data).toString('base64'),
        mineType: response.headers['content-type'],
      };
    },
    cacheTime: 3000,
    staleTime: 500,
  });

  return (
    <>
      {query.data && (
        <Image
          src={`data:${query.data.mineType};base64,${query.data.base64}`}
          alt=""
          width={98}
          height={98}
          objectFit="contain"
        />
      )}
    </>
  );
};
