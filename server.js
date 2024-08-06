const express = require('express');
const bodyParser = require('body-parser');
const ordersController = require('./controllers/orders');
const productsController = require('./controllers/products');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// API endpoints
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await ordersController.get_all_orders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await ordersController.get_order_by_id(req.params.id);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/orders', (req, res) => {
    const { order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes } = req.body;
    ordersController.add_order(order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes);
    res.json({ success: true });
});

app.delete('/api/orders/:id', async (req, res) => {
    try {
        await ordersController.delete_order_by_id(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await productsController.get_all_products();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products/:name', async (req, res) => {
    try {
        const product = await productsController.get_product_by_name(req.params.name);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/products', (req, res) => {
    const { id, img_path, name, quantity, description, category, price } = req.body;
    productsController.add_product(id, img_path, name, quantity, description, category, price);
    res.json({ success: true });
});

app.delete('/api/products/:name', async (req, res) => {
    try {
        await productsController.delete_product_by_name(req.params.name);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/products-by-category', async (req, res) => {
    try {
        const products = await productsController.get_products_by_category();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


