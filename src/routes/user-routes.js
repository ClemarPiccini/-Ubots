const express = require('express');
const controller = require('../controllers/user-controller');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const user = await controller.createUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage })
  }
});

router.get('/', async (req, res) => {
  const users = await controller.getAllUsers();
  res.send(users);
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await controller.updateUser(req.params.id, req.body);
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await controller.deleteUser(req.params.id);
    res.send(deletedUser);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

module.exports = router;  