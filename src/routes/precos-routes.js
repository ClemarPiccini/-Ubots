const express = require('express');
const controller = require('../controllers/preco-controller');

const router = express.Router();

// Rota para criar um novo horario
router.post('/', async (req, res) => {
  try {
    const preco = await controller.createPrecos(req.body);
    res.send(preco);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

// Rota para buscar todos os horarios
router.get('/', async (req, res) => {
  const precos = await controller.getAllPrecos();
  res.send(precos);
});

// Rota para atualizar um horario existente
router.put('/:id', async (req, res) => {
  try {
    const updatePreco = await controller.updatePreco(req.params.id, req.body);
    res.send(updatePreco);
  } catch (error) {
    res.status(400).send({ 'message': error.message });
  }
});

// Rota para excluir um horario existente
router.delete('/:id', async (req, res) => {
  try {
    const preco = await controller.deletePreco(req.params.id);
    res.send(preco);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

module.exports = router;
