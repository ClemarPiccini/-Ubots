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
    const clientes = await Cliente.findAll();
    return clientes.map(cliente => cliente.toJSON());
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

async function getClientesPaginados(pageNumber, itemsPerPage) {
  try {
    const totalClientes = await Cliente.count();
    const totalPages = Math.ceil(totalClientes / itemsPerPage);

    const offset = (pageNumber - 1) * itemsPerPage;
    const clientes = await Cliente.findAll({
      offset,
      limit: itemsPerPage,
    });

    const clientesData = clientes.map(cliente => cliente.toJSON());

    return {
      totalPages,
      currentPage: pageNumber,
      itemsPerPage,
      totalItems: totalClientes,
      clientes: clientesData,
    };
  } catch (error) {
    console.error('Não foi possível buscar os clientes paginados: ', error);
    throw new Error('Erro ao buscar os clientes paginados');
  }
}

module.exports = { createCliente, getAllClientes, getClientesPaginados, updateCliente, deleteCliente };
