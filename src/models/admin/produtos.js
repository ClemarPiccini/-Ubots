const Sequelize = require('sequelize');
const sequelize = require('../core');

const Produto = sequelize.define('produto', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantidade: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  valor: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

Produto.sync();

module.exports = Produto;
