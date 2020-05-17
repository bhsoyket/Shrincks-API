const express      = require('express');
const app          = express();
// const db           = require('./db/db');
const routes       = require('./routes');
// const auth         = require('./middlewares/auth');
// const errorHandler = require('./middlewares/errors');
const cors		   = require('cors');

// Load Middlewares
app.use(express.json());
app.use(cors());
// Load Middlewares
// app.use('/api/v1/pvt', auth.jwt);
// app.use('/api/external/v1', auth.app2app);
// Load Routes
app.use(routes);

// Error handler
// app.use(errorHandler);
// Listen to the Port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    //debugger;
    console.log(`server listening on ${PORT}...`);
});

module.exports = app;
