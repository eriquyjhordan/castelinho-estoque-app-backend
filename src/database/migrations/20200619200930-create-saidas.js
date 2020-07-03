module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('saidas', {
       id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
       },
       quantidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
       },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
      },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
      });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('saidas');
  }
};
