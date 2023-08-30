const express = require('express');
const controller = require('../controllers/clientes-controllers');

const router = express.Router();

// Rota para criar um novo cliente
router.post('/', async (req, res) => {
  const clienteData = req.body;

  try {
    const novoCliente = await controller.createCliente(clienteData);
    res.status(201).json(novoCliente);
  } catch (error) {
    console.error('Erro ao criar o cliente na rota: ', error);
    res.status(500).json({ message: 'Erro ao criar o cliente' });
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

// Rota para buscar clientes paginados
router.get('/paginados', async (req, res) => {
  const pageNumber = parseInt(req.query.pageNumber) || 1;
  const itemsPerPage = parseInt(req.query.itemsPerPage) || 6;

  try {
    const clientesPaginados = await controller.getClientesPaginados(pageNumber, itemsPerPage);
    res.send(clientesPaginados);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar clientes paginados' });
  }
});

module.exports = router;
