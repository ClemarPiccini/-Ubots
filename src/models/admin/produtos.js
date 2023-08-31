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
  isBeverage: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
  valor: {
    type: Sequelize.DECIMAL(10, 2), 
    allowNull: false,
  },
});

Produto.sync();

module.exports = Produto;
