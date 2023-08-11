const Sequelize = require('sequelize');
const sequelize = require('../core');

const Preco = sequelize.define('preco', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tipo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2), // Armazena valores decimais (até 10 dígitos no total, com 2 casas decimais)
    allowNull: false,
  },
});

Preco.sync();

module.exports = Preco;
