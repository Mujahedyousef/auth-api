"use strict";
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { user } = require('../models/index')
require('dotenv').config();
// const bearer = require('../middleware/bearer');
// const basic = require('../middleware/basic');
// const acl = require('../middleware/acl');
// const base64 = require('base-64')
// router.post('/signin', basic, signinfunction)
// router.get('/secretstuff', bearer, (req, res) => {

// })

// app.get("/image", bearer, acl('read'), (req, res) => { })
// app.post("image", bearer, acl('create'), (req, res) => { })
// app.put("image", bearer, acl('update'), (req, res) => { })
// app.delete("image", bearer, acl('delete'), (req, res) => { })

router.post('/signup', signUPfunction)

async function signUPfunction(req, res) {
    let userObject = req.body;
    try {
        const hashedPassword = await bcrypt.hash(userObject.password, 5);
        const newUser = await user.create({
            username: userObject.username,
            password: hashedPassword,
            role: userObject.role
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.error;
    }
}
module.exports = router;