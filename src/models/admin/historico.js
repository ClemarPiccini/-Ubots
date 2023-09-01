const Sequelize = require('sequelize');
const sequelize = require('../core');
const Produto = require('./produtos');

const Historico = sequelize.define('historico', {

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
  produtoId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Produto,
      key: 'id',
    },
  }
});

Historico.belongsTo(Produto, { foreignKey: 'produtoId' });
Produto.hasMany(Historico, { foreignKey: 'produtoId' });

Historico.sync();

module.exports = Historico;
