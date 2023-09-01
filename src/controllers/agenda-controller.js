const Agenda = require('../models/admin/agenda.js');

// Função para formatar a data 
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR');
}

// Função para formatar o horário
function formatTime(timeString) {
  return timeString;
}

async function createAgenda(agenda) {
  try {
    agenda = await Agenda.create({ ...agenda });
    return {
        servicoNome: (agenda.servicoNome),
        data: formatDate(agenda.data),
        horario: formatTime(agenda.horario),
        clienteNome: (agenda.clienteNome)
      };
  } catch (error) {
    console.error('Não foi possível criar a agenda: ', error);
    
    if (error.name === 'SequelizeDatabaseError' && error.original.sqlState === '22007') {
      // Tratar o erro específico de valor de data inválido
      return { error: 'A data fornecida é inválida.' };
    }

    throw new Error('Erro ao criar a agenda');
  }
}

async function getAllAgendas() {
  try {
    const agendas = await Agenda.findAll();

    // Mapeia os objetos Agenda para um formato desejado
    const formattedAgendas = agendas.map(agenda => {
      return {
        servicoNome: (agenda.servicoNome),
        data: formatDate(agenda.data),
        horario: formatTime(agenda.horario),
        clienteNome: (agenda.clienteNome)
      };
    });

    return formattedAgendas;
  } catch (error) {
    console.error('Não foi possível buscar os horários: ', error);
    throw new Error('Erro ao buscar os horários');
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
      return toJSON()
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
