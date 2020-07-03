'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'insumos',
      'sub_category',
      {
        type: Sequelize.INTEGER,
        references: { model: 'sub_categories', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('insumos', 'sub_category')
  }
};
