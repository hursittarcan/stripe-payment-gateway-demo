require('dotenv').config();

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
const app = express();

const storeItems = new Map([
    [1, { priceInCents: 10000, name: "Learn React Today" }],
    [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

app.use(express.json());
app.use(express.static("public"));

app.post('/create-checkout-session', (req, res) => {
    res.json({ url: 'post-works'});
});

app.listen(3000);