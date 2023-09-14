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

app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: 'payment',
            success_url: `${process.env.SERVER_URL}/success.html`,
            cancel_url:`${process.env.SERVER_URL}/cancel.html`
        })
        res.json({ url: session.url });
    } catch(e) {
        res.status(500).json({ error: e.message });
    }
});

app.listen(3000);