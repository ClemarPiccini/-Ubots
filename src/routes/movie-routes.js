const express = require('express');
const controller = require('../controllers/movie_controller');

const router = express.Router();

// Rota para criar um novo filme
router.post('/', async (req, res) => {
  try {
    const movie = await controller.createMovie(req.body);
    res.send(movie);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

// Rota para buscar todos os filmes
router.get('/', async (req, res) => {
  const movies = await controller.getAllMovies();
  res.send(movies);
});

// Rota para atualizar um filme existente
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await controller.updateMovie(req.params.id, req.body);
    res.send(updatedMovie);
  } catch (error) {
    res.status(400).send({ 'message': error.message });
  }
});

// Rota para excluir um Filme existente
router.delete('/:id', async (req, res) => {
  try {
    const movie = await controller.deleteMovie(req.params.id);
    res.send(movie);
  } catch (error) {
    res.status(400).send({ 'message': error.parent.sqlMessage });
  }
});

// Rota para buscar filmes sem avaliação
router.get('/unrated', async (req, res) => {
  const movies = await controller.getNonRatedMovies();
  res.send(movies);
});

module.exports = router;
