const express = require('express');
const controller = require('../controllers/agenda-controller');

const router = express.Router();

// Rota para criar um novo horario
router.post('/', async (req, res) => {
  try {
    const agenda = await controller.createAgenda(req.body);
    res.send(agenda);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

// Rota para buscar todos os horarios
router.get('/', async (req, res) => {
  const agendas = await controller.getAllAgendas();
  res.send(agendas);
});

// Rota para atualizar um horario existente
router.put('/:id', async (req, res) => {
  try {
    const updateAgenda = await controller.updateAgenda(req.params.id, req.body);
    res.send(updateAgenda);
  } catch (error) {
    res.status(400).send({ 'message': error.message });
  }
});

// Rota para excluir um horario existente
router.delete('/:id', async (req, res) => {
  try {
    const agenda = await controller.deleteAgenda(req.params.id);
    res.send(agenda);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

module.exports = router;
