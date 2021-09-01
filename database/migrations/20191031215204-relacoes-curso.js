'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('curso', ['id_area'], {
      type: 'foreign key',
      name: 'curso_id_area_fk',
      references: {
        table: 'area',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'curso',
      'curso_id_area_fk'
    );
  }
};
