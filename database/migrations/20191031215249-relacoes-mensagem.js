'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('mensagem', ['id_partida'], {
      type: 'foreign key',
      name: 'mensagem_id_partida_fk',
      references: {
        table: 'partida',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }).then(() => queryInterface.addConstraint('mensagem', ['id_user'], {
      type: 'foreign key',
      name: 'mensagem_id_user_fk',
      references: {
        table: 'user',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'mensagem',
      'mensagem_id_partida_fk'
    ).then(() =>
      queryInterface.removeConstraint(
        'mensagem',
        'mensagem_id_user_fk'
      ));
  }
};
