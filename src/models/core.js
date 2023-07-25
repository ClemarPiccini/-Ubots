const Sequelize = require('sequelize');
const dotenv = require('../../dotenv');

//estabelece uma conexão com o banco de dados Mysql
dotenv.config();
//variaveis de ambiente
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE, 
  process.env.MYSQL_USER, 
  process.env.MYSQL_PASSWORD, 
  {
    dialect: 'mysql',
    host: 'localhost',
    port: parseInt(process.env.MYSQL_PORT)
  }
);

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso!'))
  .catch((error) => console.error('Não foi possível conectar ao banco de dados: ', error));

module.exports = sequelize;