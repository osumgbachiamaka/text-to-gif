const express = require('express');
const bodyParser = require('body-parser')
const gifRoute = require('./gifRoute')
// const dotenv = require('dotenv');
const app = express();

// dotenv.config();

app.set('view engine', 'ejs');
app.use(express.static("./public"));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/gif', gifRoute)
app.use('/', (req, res) => {
    res.redirect('/gif')
})
module.exports = app;
