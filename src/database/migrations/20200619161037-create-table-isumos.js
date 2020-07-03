'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('insumos', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      quantidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      minimo: {
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

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('insumos');
  }
};
