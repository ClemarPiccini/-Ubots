const express = require('express')

const produtoRouter = require('./routes/produtos-routes');
const agendaRouter = require('./routes/agenda-routes');
const clienteRouter = require('./routes/clientes-routes');
const precoRouter = require('./routes/precos-routes');

const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));    

app.use('/produtos', produtoRouter);
app.use('/horarios', agendaRouter);
app.use('/clientes', clienteRouter);
app.use('/precos', precoRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
