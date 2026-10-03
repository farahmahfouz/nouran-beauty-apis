const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const globalHandleMiddleware = require('./src/middlewares/errorMiddleware');
const AppError = require('./src/utils/appError');

const userRoutes = require('./src/routes/userRoutes');


const app = express();

app.use(cors());

// 📊 Development Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}


app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "Beauty Store API is running",
  });
});

// 🛣️ Routes
app.use('/api/v1/users', userRoutes);

// 🔍 Handle Undefined Routes
app.use((req, res, next) => {
  next(
    new AppError(`Error Can't find ${req.originalUrl} on this server!`, 404)
  );
});

// 🚨 Global Error Handler
app.use(globalHandleMiddleware);


module.exports = app;