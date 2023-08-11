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
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

Cliente.sync();

module.exports = Cliente;
