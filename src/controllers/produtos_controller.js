const Produto = require('../models/admin/produtos');

async function createProduto(produto) {
  try {
    const novoProduto = await Produto.create({ ...produto });
    return novoProduto.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o produto: ', error);
    throw new Error('Erro ao criar o produto');
  }
}

async function getAllProduto() {
  try {
    produtos = await Produto.findAll();
    return produtos.map(produto => produto.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os produtos: ', error);
    res.status(500).json({ message: 'Erro ao buscar os produtos' });
  }
}

async function updateProduto(id, data) {
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      produto.nome = data.nome;
      produto.quantidade = data.quantidade;
      produto.isBeverage = data.isBeverage;

      await produto.save();
      console.log('produto atualizado', produto.toJSON());
      return produto.toJSON(); // Return the updated product
    } else {
      return null; // Indicate that the product was not found
    }
  } catch (error) {
    console.error('Não foi possível atualizar o produto:', error);
    throw new Error('Erro ao atualizar o produto');
  }
}

async function deleteProduto(id) {
  try {
    const produtoEncontrado = await Produto.findByPk(id);
    if (produtoEncontrado) {
      await produtoEncontrado.destroy();
      console.log('Produto excluido: ', produtoEncontrado.toJSON());
    } else {
      console.log('Produto não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o produto: ', error);
  }
}

module.exports = { createProduto, getAllProduto, updateProduto, deleteProduto };
