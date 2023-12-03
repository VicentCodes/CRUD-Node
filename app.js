const express = require('express');
const app = express();
const log = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Configuration of environment variables on .env file
dotenv.config();
const userPass = process.env.USER_PASS; // use your own user and password to access MongoDB database
const databaseName = process.env.DATABASE; // use your own database name

// Application configuration
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(log('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
const indexRoutes = require('./src/routers/index.js');
app.use('/', indexRoutes);

// Connection to MongoDB
mongoose.connect(`mongodb+srv://${userPass}@cluster0.vvzgy0s.mongodb.net/${databaseName}?retryWrites=true&w=majority`)
  .then(db => {
    console.log('db connected :)');
    app.listen(app.get('port'), () => {
      console.log('The server is running on port', app.get('port'));
    });
  })
  .catch(err => console.log(err));
