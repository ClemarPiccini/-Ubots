const express = require('express');
const controller = require('../controllers/clientes-controllers');

const router = express.Router();

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
  try {
    const cliente = await controller.createCliente(req.body);
    res.send(cliente);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

// Rota para buscar todos os clientes
router.get('/', async (req, res) => {
  const clientes = await controller.getAllClientes();
  res.send(clientes);
});

// Rota para atualizar um cliente existente
router.put('/:id', async (req, res) => {
  try {
    const updateCliente = await controller.updateCliente(req.params.id, req.body);
    res.send(updateCliente);
  } catch (error) {
    res.status(400).send({ 'message': error.message });
  }
});

// Rota para excluir um cliente existente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await controller.deleteCliente(req.params.id);
    res.send(cliente);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

module.exports = router;
