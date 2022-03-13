"use strict";
// require('dotenv').config();
// const SECRET = process.env.SECRET;
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const user = (sequelize, DataTypes) => sequelize.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('admin', 'editor', 'writer', 'user'),
        defaultValue: 'user'
    },
    token: {
        type: DataTypes.VIRTUAL
    },
    actions: {
        type: DataTypes.VIRTUAL,
        get() {
            const acl = {
                user: ["read"],
                writer: ["read", "create"],
                editor: ["read", "create", "update"],
                admin: ["read", "create", "update", "delete"]
            }
            return acl[this.role];
        }
    }

})
module.exports = user;
// user.authenticateBasic = async function (username, password) {
//     const user = await this.findOne({ where: { username } });
//     const valid = await bcrypt.compare(password, user.password);
//     if (valid) {
//         let newToken = jwt.sign({ username: user.username }, SECRET, { expiresIn: 900000 })
//         user.token = newToken;
//         return user;
//     } else {
//         throw new Error('Invalid User');
//     }
// }







