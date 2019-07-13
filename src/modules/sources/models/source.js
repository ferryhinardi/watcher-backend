export default (sequelize, Sequelize) => {
  const Source = sequelize.define(
    'Source',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.STRING,
      link: Sequelize.STRING,
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
      tableName: 'sources',
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );
  Source.associate = models => {
    Source.Movie = models.Source.hasMany(models.Movie, {
      foreignKey: 'source_id',
    });
  };
  return Source;
};
