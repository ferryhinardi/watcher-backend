import { Source } from 'models';

export async function findSource() {
  const source = await Source.findOne({
    where: { id: 1 },
  });

  return source;
}

export default {
  Query: {
    sources: () => {
      return [
        {
          title: 'abc',
          description: 'aaa',
        },
      ];
    },
  },
};
