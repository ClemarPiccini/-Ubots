const express = require('express')
const cors = require('cors')

const produtoRouter = require('./routes/produtos-routes');
const agendaRouter = require('./routes/agenda-routes');
const clienteRouter = require('./routes/clientes-routes');
const precoRouter = require('./routes/precos-routes');
const userRouter = require('./routes/user-routes');
const loginRouter = require('./routes/login-routes');

const bodyParser = require('body-parser');
const app = express();
const PORT = 3001;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/produtos', produtoRouter);
app.use('/horarios', agendaRouter);
app.use('/clientes', clienteRouter);
app.use('/precos', precoRouter);
app.use('/users', userRouter);
app.use('/login', loginRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
