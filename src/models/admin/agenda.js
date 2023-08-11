const Sequelize = require('sequelize');
const sequelize = require('../core');

const Agenda = sequelize.define('agenda', {
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  horario: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  cliente: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  servico: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

Agenda.sync();

module.exports = Agenda;
