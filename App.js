const express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./src/server/models/product');
const Category = require('./src/server/models/category');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

// Render homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/client/pages/home.html'), err => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

// Render ready-to-wear page
app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/client/pages/list.html'), err => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

// Render contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/client/pages/contact.html'), err => {
        if (err) {
            res.status(err.status).end();
        }
    });
});

// Get all products by category with/without color filter
app.post('/products', async (req, res) => {
    let products = null;
    if (req.body.id) {
        products = await Product.find({
            'category': mongoose.Types.ObjectId(req.body.id)
        }).sort({ 'name': 1 });
    } else {
        products = await Product.find({}).sort({ 'name': 1 });
    }
    return res.status(200).send(products);
});

// Filter products by color
app.post('/products/filter_by=color', async (req, res) => {
    let criteria = {
        'category': mongoose.Types.ObjectId(req.body.id),
    };
    if (req.body.color) {
        criteria.color = { $in: req.body.color };
    }
    const products = await Product.find(criteria);
    return res.status(200).send(products);
});

// Sort products by price
app.post('/products/sort_by=price', async (req, res) => {
    const products = await Product.find({
        'category': mongoose.Types.ObjectId(req.body.id)
    }).sort({ 'price': req.body.ord }).exec(function (err, results) {
        return res.status(200).send(results);
    });
});

// Filter products by size
app.post('/products/filter_by=size', async (req, res) => {
    const products = await Product.find({
        'category': mongoose.Types.ObjectId(req.body.id),
        'size': req.body.size
    })
    return res.status(200).send(products);
});

mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}!`);
        })
    });