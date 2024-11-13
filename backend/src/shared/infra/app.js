require('dotenv').config();

const express = require('express');
const path = require('path');

const { errors } = require('celebrate');

const Youch = require('youch');

require('express-async-errors');

const routes = require('./routes');

const app = express();

const port = 3333;

app.use(express.static(path.join(__dirname, '../frontend/dist')));


const cors = require('cors');

app.use(express.json());

app.use(cors({ origin: '*' }));

app.use(routes);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.use(errors()); // Error handling middleware

app.use(async (error, request, response, next) => {
  const errors = await new Youch(error, request).toJSON();

  return response.status(errors.error.status || 500).json({
    error: {
      code: errors.error.status || 500,
      message: errors.error.message,
    },
  });
});
app.listen(port, () => console.log(`Rolling in the door ${port}`));
