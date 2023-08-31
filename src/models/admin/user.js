const Sequelize = require('sequelize');
const sequelize = require('../core');
const dotenv = require('../../../dotenv');

//modelo de usuario dentro da tabela MYSQL
dotenv.config();

const User = sequelize.define('User', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});
//Cria a tabela caso não exista
User.sync();

module.exports = User;
