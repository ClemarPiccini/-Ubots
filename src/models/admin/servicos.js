const Sequelize = require('sequelize');
const sequelize = require('../core');

const Servico = sequelize.define('Servico', {
  nome: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false,
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

Servico.sync();

module.exports = Servico;
