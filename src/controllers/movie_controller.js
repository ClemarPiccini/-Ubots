const Movie = require('../models/movie');

async function createMovie(movie) {
  try {
    movie = await Movie.create({ ...movie});
    return movie.toJSON();
  } catch (error) {
    console.error('Não foi possível criar o filme: ', error);
    res.status(500).json({ message: 'Erro ao criar o filme' });
  }
}

async function getAllMovies() {
  try {
    movies = await Movie.findAll();
    return movies.map(movie => movie.toJSON());
  } catch (error) {
    console.error('Não foi possível buscar os filmes: ', error);
    res.status(500).json({ message: 'Erro ao buscar os filmes' });
  }
}

async function updateMovie(id, data) {
  try {
    const movie = await Movie.findByPk(id);
    if (movie) {
        movie.titulo = data.titulo;
        movie.ano = data.ano;
        movie.autor = data.autor;
        movie.genero = data.genero;
        movie.avaliacao = data.avaliacao;
      
      await movie.save();
      console.log ('Filme atualizado' , movie.toJSON());
    } else {
      res.status(404).json({ message: 'Filme não encontrado' });
    }
  } catch (error) {
    console.error('Não foi possível atualizar o filme: ', error);
    res.status(500).json({ message: 'Erro ao atualizar o filme' });
  }
}

async function deleteMovie(id) {
  try {
    const movie = await Movie.findByPk(id);
    if (movie) {
      await movie.destroy();
      console.log('Filme excluido: ', movie.toJSON());
    } else {
      console.log('Filme não encontrado');
    }
  } catch (error) {
    console.error('Não foi possível excluir o filme: ', error);
  }
}

async function getNonRatedMovies() {
    try {
      movies = await Movie.findAll({
        where: {
          avaliacao: null,
        },
      });
      return movies.map(movie => movie.toJSON());
    } catch (error) {
      console.error('Não foi possível buscar os filmes: ', error);
      res.status(500).json({ message: 'Erro ao buscar os filmes' });
    }
  }

module.exports = { createMovie, getAllMovies, updateMovie, deleteMovie, getNonRatedMovies };
