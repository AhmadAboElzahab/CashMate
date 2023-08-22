const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Auth = require('./routes/auth.route');

require('dotenv').config();
app.use(express.json());

app.use('/api/auth', Auth);

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Coneected on http://localhost:${process.env.PORT}/`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
