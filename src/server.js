"use strict";
const express = require('express');
const app = express();
const cors = require('cors');
const notFound = require('./errorHandler/404');
const errorHandler = require('./errorHandler/404');
const signup = require('./auth/Router/signup');
const signin = require('./auth/Router/signin');
const secret = require('./auth/Router/secret');
const V1Router = require('./auth/Router/V1Router')
const V2Router = require('./auth/Router/V2Router')

const bearer = require('./auth/middleware/bearer');
const { user } = require('./auth/models');
app.use(express.json());
app.use(cors());
app.use(signup);
app.use(signin);
app.use(secret);
app.use("api/v1", V1Router)
app.use("api/v2", V2Router)

app.get('/', (req, res) => {
    res.status(200).send("Welcom in Home page..");
})
app.get('/users', bearer, async (req, res) => {
    let users = await user.findAll();
    res.status(200).json(users)
})
function start(port) {
    app.listen(port, () => {
        console.log(`The server is running on https://localhost:${port}`);
    });
}


app.use(errorHandler)
app.use('*', notFound)
module.exports = {
    start: start,
    app: app
}