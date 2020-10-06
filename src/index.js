const express      = require('express');
const app          = express();
const db           = require('./db/db');
const routes       = require('./routes');
const auth         = require('./middlewares/auth');
const errorHandler = require('./middlewares/errors');
const cors		   = require('cors');
const colors       = require('colors');

require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use('/api', auth.jwt);
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server listening on ${process.env.PORT}...`.bgGreen.black);
});

module.exports = app;
