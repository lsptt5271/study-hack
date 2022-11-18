import { GetStudiesInput } from '@/graphqls/resolvers/type';
import client from '@/providers/client';

const studyProvider = () => {
  const findByMenuIdsInAndStartAtAndEndAt = (input: GetStudiesInput) => {
    return client.study.findMany({
      where: {
        AND: {
          menu_id: {
            in: input.menuIds,
          },
          start_at: {
            lte: input.startAt,
          },
          end_at: {
            gte: input.endAt,
          },
        },
      },
    });
  };

  return { findByMenuIdsInAndStartAtAndEndAt };
};

export default studyProvider;
