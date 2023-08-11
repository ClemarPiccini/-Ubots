const express = require('express');
const controller = require('../controllers/produtos_controller');

const router = express.Router();

// Rota para criar um novo produto
router.post('/', async (req, res) => {
  try {
    const produto = await controller.createProduto(req.body);
    res.send(produto);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
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
    res.send(updatedProduto);
  } catch (error) {
    res.status(400).send({ 'message': error.message });
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
