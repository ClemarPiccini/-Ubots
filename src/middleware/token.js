const jwt = require('jsonwebtoken');
const dotenv = require('../dotenv');

dotenv.config();

// Middleware para verificar o token JWT
function verificarToken(req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).send('Token não encontrado.');
  };
  
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Token inválido.');
  }
}

// Middleware para verificar o nível de acesso do usuário
function checkAuthorization(acesso) {
  return (req, res, next) => {
    const userLevel = req.user ? req.user.acesso : -1;
    if (userLevel == 0 || userLevel == acesso) {
      res.json({ permissao: true });
      return next();
    } else {
      res.status(401)
      res.json({ permissao: false });
      return next();
    }
  };
}
  
module.exports = {verificarToken, checkAuthorization}
  