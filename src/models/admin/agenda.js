const Sequelize = require('sequelize');
const sequelize = require('../core');
const Servico =  require('./servicos');
const Cliente = require('./clientes');

const Agenda = sequelize.define('Agenda', {
  data: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  horario: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  clienteNome: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: Cliente,
      key: 'nome',
    },
  },
  servicoNome: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: Servico,
      key: 'nome',
    },
  },
});

Agenda.belongsTo(Servico, { foreignKey: 'servicoNome' });
Servico.hasMany(Agenda, { foreignKey: 'servicoNome' });

Agenda.belongsTo(Cliente, { foreignKey: 'clienteNome' });
Cliente.hasMany(Agenda, { foreignKey: 'clienteNome' });


Agenda.sync();

module.exports = Agenda;
