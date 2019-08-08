export default (sequelize, Sequelize) => {
  const Movie = sequelize.define(
    'Movie',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: Sequelize.STRING,
      synopsis: Sequelize.STRING,
      imageUrl: {
        field: 'image_url',
        type: Sequelize.STRING,
      },
      imageDetailUrl: {
        field: 'image_detail_url',
        type: Sequelize.STRING,
      },
      url: Sequelize.STRING,
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
      },
      deletedAt: {
        field: 'deleted_at',
        type: Sequelize.DATE,
      },
    },
    {
      tableName: 'movies',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );
  Movie.associate = models => {
    Movie.Source = models.Movie.belongsTo(models.Source, {
      foreignKey: 'source_id',
    });
  };
  return Movie;
};
