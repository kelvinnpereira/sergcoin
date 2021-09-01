'use strict';
module.exports = (sequelize, DataTypes) => {
  const partida = sequelize.define('partida', {
    id_user_1: DataTypes.INTEGER,
    id_user_2: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    winner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fen: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
  });
  partida.associate = function(models) {
    partida.belongsTo(models.user, {foreignKey: 'id_user_1', as: 'user1'});
    partida.belongsTo(models.user, {foreignKey: 'id_user_2', as: 'user2'});
    partida.belongsTo(models.user, {foreignKey: 'winner'   , as: 'user_winner'});
    partida.hasMany(models.mensagem, {foreignKey: 'id_partida'});
  };
  return partida;
};