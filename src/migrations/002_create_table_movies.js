export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      source_id: {
        type: Sequelize.INTEGER,
        onDelete: 'SET NULL',
        allowNull: true,
        references: {
          model: 'sources',
          field: 'id',
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    }),
  down: queryInterface => queryInterface.dropTable('movies'),
};
