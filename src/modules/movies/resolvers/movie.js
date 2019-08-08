import { Movie, sequelize } from 'models';
import resolver from 'modules/shared/lib/graphql-sequelize/resolver';

export async function insertMovie(movieData) {
  let transaction;

  try {
    transaction = await sequelize.transaction();
    const [movie, created] = await Movie.findOrCreate({
      where: movieData,
      transaction,
    });

    if (created) {
      await transaction.commit();
    }
    return movie;
  } catch (error) {
    await transaction.rollback();
    return error;
  }
}

export default {
  Movie: {
    source: resolver(Movie.Source),
  },
  Query: {
    movies: resolver(Movie),
    movie: resolver(Movie, {
      before: (findOption, args) => {
        if (args.id) {
          findOption.where = {
            id: args.id,
          };
        }

        return findOption;
      },
    }),
  },
  Mutation: {
    createMovie: async (_, { movie: movieParam }) => {
      const movie = await insertMovie(movieParam);
      return movie;
    },
  },
};
