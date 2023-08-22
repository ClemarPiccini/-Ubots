const Agenda = require('../models/admin/agenda.js');

async function createAgenda(agenda) {
  try {
    agenda = await Agenda.create({ ...agenda });
    return agenda.toJSON();
  } catch (error) {
    console.error('Não foi possível criar a agenda: ', error);
    throw new Error('Erro ao criar o agenda');
  }
}

async function getAllAgendas() {
  try {
    const agenda = await Agenda.findAll();
    return agenda.map(agenda => agenda.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os horarios: ', error);
    throw new Error('Erro ao buscar os horarios');
  }
}

async function updateAgenda(id, data) {
  try {
    const agenda = await Agenda.findByPk(id);
    if (agenda) {
        agenda.data = data.data;
        agenda.horario = data.horario;
        agenda.cliente = data.cliente;
        agenda.servico = data.servico;

      await agenda.save();
      console.log('Agenda atualizada', agenda.toJSON());
      return agenda.toJSON()
    } else {
      return null;
    }
  } catch (error) {
    console.error('Não foi possível atualizar a agenda: ', error);
    throw new Error('Erro ao atualizar a agenda');
  }
}

async function deleteAgenda(id) {
  try {
    const agenda = await Agenda.findByPk(id);
    if (agenda) {
      await agenda.destroy();
      console.log('Agenda excluída: ', agenda.toJSON());
    } else {
      console.log('Agenda não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir a agendaz: ', error);
  }
}

module.exports = { createAgenda, getAllAgendas, updateAgenda, deleteAgenda };
