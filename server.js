const express = require('express');
const bodyParser = require('body-parser');
const ordersController = require('./controllers/orders');
const productsController = require('./controllers/products');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/add-order', async (req, res) => {
    const { order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes } = req.body;
    try {
        const result = await ordersController.add_order(order_id, product_id, quantity, total_price, fname, lname, street_address, town, state, phone, exphone, email, notes);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/orders', async (req, res) => {
    try {
        const orders = await ordersController.get_all_orders();
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/order/:id', async (req, res) => {
    const order_id = req.params.id;
    try {
        const order = await ordersController.get_order_by_id(order_id);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/order/:id', async (req, res) => {
    const order_id = req.params.id;
    try {
        const result = await ordersController.delete_order_by_id(order_id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/add-product', async (req, res) => {
    const { id, img_path, name, quantity, description, category, price } = req.body;
    try {
        const result = await productsController.add_product(id, img_path, name, quantity, description, category, price);
        res.json(result);
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

app.get('/api/product/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const product = await productsController.get_product_by_name(name);
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/product/:name', async (req, res) => {
    const name = req.params.name;
    try {
        await productsController.delete_product_by_name(name);
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/categories', async (req, res) => {
    try {
        const categories = await productsController.get_catogries();
        res.json(categories);
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
