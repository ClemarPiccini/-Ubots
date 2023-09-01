const Produto = require('../models/admin/produtos');
const Historico = require('../models/admin/historico');

const produtosCopiados = {};

async function copiarParaTabelaHistorico(produtoId) {
  try {
    if (!produtosCopiados[produtoId]) {
      console.log('produtoId:', produtoId);
      const produto = await Produto.findByPk(produtoId);
      if (produto) {
        console.log('Copiando dados para histórico:', produto.toJSON()); // Adicione esta linha para depuração
        await Historico.create({
          nome: produto.nome,
          quantidade: produto.quantidade,
          isBeverage: produto.isBeverage,
          valor: produto.valor,
          produtoId: produto.id
        });
        console.log('Dados copiados para a tabela de histórico com sucesso!');
        produtosCopiados[produtoId] = false;
      } else {
        console.log('Produto não encontrado');
      }
    } else {
      console.log('Dados já copiados para a tabela de histórico.');
    }
  } catch (error) {
    console.error('Erro ao copiar os dados para a tabela de histórico:', error);
    throw new Error('Erro ao copiar os dados para a tabela de histórico');
  }
}

async function createProduto(produto) {
  try {
    produto = await Produto.create({ ...produto });
    copiarParaTabelaHistorico(produto.id);
    return produto.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o produto: ', error);
    throw new Error('Erro ao criar o produto');
  }
}

async function getAllProduto() {
  try {
    const produtos = await Produto.findAll();
    return produtos.map(produto => produto.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os produtos: ', error);
    throw new Error('Erro ao buscar os produtos');
  }
}

async function updateProduto(id, data) {
  try {
    const produto = await Produto.findByPk(id);
    if (produto) {
      produto.nome = data.nome;
      produto.quantidade = data.quantidade;
      produto.isBeverage = data.isBeverage;
      produto.valor = data.valor;

      await produto.save();
      copiarParaTabelaHistorico(produto.id);
      console.log('Produto atualizado', produto.toJSON());
      return produto.toJSON();
    } else {
      return null;
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
      console.log('Produto excluído: ', produtoEncontrado.toJSON());
    } else {
      console.log('Produto não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o produto: ', error);
    throw new Error('Erro ao excluir o produto');
  }
}

module.exports = { createProduto, getAllProduto, updateProduto, deleteProduto };
