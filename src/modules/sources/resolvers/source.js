import { Source } from 'models';

export async function findSource(id) {
  const source = await Source.findOne({
    where: { id },
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
