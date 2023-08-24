const express = require('express');
const jwt = require('jsonwebtoken');
const controller = require('../controllers/user-controller');
const dotenv = require('../../dotenv');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, senha } = req.body;

    // verificar se o usuário existe no banco de dados
    const user = await controller.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    // verificar se a senha está correta
    const isMatch = await controller.comparePassword(senha, user.senha);;
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    // criar token de autenticação
    const token = jwt.sign({ 
      acesso: user.nivel_acesso,
      nome: user.nome,
      email: user.email,
      empresa: user.empresa
    }, process.env.SECRET_KEY, { expiresIn: '8h' });
    res.json({ token });
    
  } 
  catch (error) {
    res.status(400).send({ 'message': error.message});
    
  }
});

module.exports = router;  
