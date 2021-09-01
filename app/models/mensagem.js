'use strict';
module.exports = (sequelize, DataTypes) => {
  const mensagem = sequelize.define('mensagem', {
    id_partida: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    mensagem: DataTypes.STRING
  }, {
    underscored: true,
    freezeTableName: true,
  });
  mensagem.associate = function(models) {
    mensagem.belongsTo(models.partida, {foreignKey: 'id_partida'});
    mensagem.belongsTo(models.user, {foreignKey: 'id_user'});
  };
  return mensagem;
};