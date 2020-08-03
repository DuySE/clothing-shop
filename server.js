const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const Product = require('./src/models/product');
const app = express();

app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));

// Render homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/home.html'), err => {
        if (err) {
            res.status(err.status).end();
        } else {
            console.log('Sent: home.html');
        }
    });
});

// Render ready-to-wear products page
app.get('/category', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/detail.html'), err => {
        if (err) {
            res.status(err.status).end();
        } else {
            console.log('Sent: detail.html');
        }
    });
});

// Render contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/pages/contact.html'), err => {
        if (err) {
            res.status(err.status).end();
        } else {
            console.log('Sent: contact.html');
        }
    });
});

// Get all products by category
app.get('/category/:id', async (req, res) => {
    const products = await Product.find({ 'category': mongoose.Types.ObjectId(req.params.id) });
    return res.status(200).send(products);
});

mongoose
    .connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening on port ${process.env.PORT}!`);
        })
    });