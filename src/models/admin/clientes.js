const Sequelize = require('sequelize');
const sequelize = require('../core');

const Cliente = sequelize.define('cliente', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  telefone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Cliente.sync();

module.exports = Cliente;
