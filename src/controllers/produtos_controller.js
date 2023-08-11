const Produto = require('../models/admin/produtos');

async function createProduto(produto) {
  try {
    produto = await Produto.create({ ...produto});
    return produto.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o produto: ', error);
    res.status(500).json({ message: 'Erro ao criar o produto' });
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

async function updateProduto (id, data) {
  try {
    const produto  = await Produto.findByPk(id);
    if (produto ) {
        produto.nome = data.nome;
        produto.quantidade = data.quantidade;
        produto.valor = data.valor;
  
      
      await produto .save();
      console.log ('produto atualizado' , produto .toJSON());
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Não foi possível atualizar o produto: ', error);
    res.status(500).json({ message: 'Erro ao atualizar o produto' });
  }
}

async function deleteProduto (id) {
  try {
    const produto  = await produto.findByPk(id);
    if (produto) {
      await produto .destroy();
      console.log('Produto excluido: ', produto.toJSON());
    } else {
      console.log('Produto não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o produto: ', error);
  }
}

module.exports = { createProduto, getAllProduto, updateProduto, deleteProduto };
