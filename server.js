const express = require('express');
const bodyParser = require('body-parser');
const ordersController = require('./controllers/orders');
const productsController = require('./controllers/products');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
