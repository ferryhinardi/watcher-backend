export default {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('movies', 'image_detail_url', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'image_url',
    }),
  down: queryInterface =>
    queryInterface.removeColumn('movies', 'image_detail_url'),
};
