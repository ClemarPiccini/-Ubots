const Sequelize = require('sequelize');
const sequelize = require('../models/core');

const Movie = sequelize.define('movie', {
  titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  ano: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  autor: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avaliacao: {
    type: Sequelize.FLOAT,
    allowNull: true,
  }
});

Movie.sync();

module.exports = Movie;
