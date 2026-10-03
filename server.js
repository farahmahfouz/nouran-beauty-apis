const mongoose = require('mongoose');

require('dotenv').config();
const app = require('./app');

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => {
    console.log('Connect with mongodb server');
  })
  .catch((err) => {
    console.log('Faild to connect with MongoDb server', err);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
