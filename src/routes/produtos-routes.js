const express = require('express');
const controller = require('../controllers/produtos_controller');

const router = express.Router();

// Rota para criar um novo produto
router.post('/', async (req, res) => {
  const produtoData = req.body;

  try {
    const novoProduto = await controller.createProduto(produtoData);
    res.status(201).json(novoProduto);
  } catch (error) {
    console.error('Erro ao criar o produto na rota: ', error);
    res.status(500).json({ message: 'Erro ao criar o produto' });
  }
});
// Rota para buscar todos os produtos
router.get('/', async (req, res) => {
  const produtos = await controller.getAllProduto();
  res.send(produtos);
});

// Rota para atualizar um produto existente
router.put('/:id', async (req, res) => {
  try {
    const updatedProduto = await controller.updateProduto(req.params.id, req.body);
    if (updatedProduto) {
      res.send(updatedProduto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Rota para excluir um Produto existente
router.delete('/:id', async (req, res) => {
  try {
    const produto = await controller.deleteProduto(req.params.id);
    res.send(produto);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

module.exports = router;
