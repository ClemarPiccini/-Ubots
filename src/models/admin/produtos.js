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
    type: Sequelize.BOOLEAN, // Represents whether the product is a beverage or not
    allowNull: false,
    defaultValue: false, // Default value indicating it's not a beverage
  }
});

Produto.sync();

module.exports = Produto;
