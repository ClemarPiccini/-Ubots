const Preco = require('../models/admin/precos');

async function createPrecos(preco) {
  try {
    preco = await Preco.create({ ...preco });
    return preco.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o preco: ', error);
    throw new Error('Erro ao criar o preco');
  }
}

async function getAllPrecos() {
  try {
    const precos = await Preco.findAll();
    return precos.map(preco => preco.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os precos: ', error);
    throw new Error('Erro ao buscar os precos');
  }
}

async function updatePreco(id, data) {
  try {
    const preco = await Preco.findByPk(id);
    if (preco) {
        preco.nome = data.nome;
        preco.tipo = data.tipo;
        preco.valor = data.valor;

      await preco.save();
      console.log('Preço atualizado', preco.toJSON());
    } else {
      throw new Error('Preço não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível atualizar o preco: ', error);
    throw new Error('Erro ao atualizar o preco');
  }
}

async function deletePreco(id) {
  try {
    const preco = await Preco.findByPk(id);
    if (preco) {
      await preco.destroy();
      console.log('preco excluído: ', preco.toJSON());
    } else {
      console.log('preco não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o preco: ', error);
  }
}

module.exports = { createPrecos, getAllPrecos, updatePreco, deletePreco };
