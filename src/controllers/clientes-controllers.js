const Cliente = require('../models/admin/clientes');

async function createCliente(cliente) {
  try {
    const novoCliente = await Cliente.create({ ...cliente });
    return novoCliente.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o cliente: ', error);
    throw new Error('Erro ao criar o cliente');
  }
}

async function getAllClientes() {
  try {
    // Busca todos os clientes do banco de dados
    const clientes = await Cliente.findAll();

    // Ordena os clientes em ordem alfabética com base no nome (ou outra propriedade apropriada)
    clientes.sort((a, b) => {
      const nomeA = a.nome.toLowerCase();
      const nomeB = b.nome.toLowerCase();
      if (nomeA < nomeB) return -1;
      if (nomeA > nomeB) return 1;
      return 0;
    });

    // Mapeia os clientes para JSON
    const clientesJSON = clientes.map(cliente => cliente.toJSON());

    return clientesJSON;
  } catch (error) {
    console.error('Não foi possível buscar os clientes: ', error);
    throw new Error('Erro ao buscar os clientes');
  }
}


async function updateCliente(id, data) {
  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      cliente.nome = data.nome;
      cliente.telefone = data.telefone;

      await cliente.save();
      console.log('Cliente atualizado', cliente.toJSON());
      return cliente.toJSON()
    } else {
      throw new Error('Cliente não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível atualizar o cliente: ', error);
    throw new Error('Erro ao atualizar o cliente');
  }
}

async function deleteCliente(id) {
  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      await cliente.destroy();
      console.log('Cliente excluído: ', cliente.toJSON());
    } else {
      console.log('Cliente não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o cliente: ', error);
  }
}

module.exports = { createCliente, getAllClientes, updateCliente, deleteCliente };
