const express = require('express')

const produtoRouter = require('./routes/produtos-routes');

const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));    

app.use('/produtos', produtoRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
  });
