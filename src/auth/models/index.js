const { Sequelize, DataTypes } = require('sequelize');
const user = require('./users-model')
const Collection = require('./collection-class-model')
const food = require('./food');
const clothes = require('./clothes')
require('dotenv').config()


const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

let sequelizeOptions = process.env.NODE_ENV === 'production' ? {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    }
} : {};

let sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
let foodModel = food(sequelize, DataTypes)
let clothesModel = clothes(sequelize, DataTypes)
let foodCollect = new Collection(foodModel)
let clothesCollect = new Collection(clothesModel)
// const userCollection = new Collection(user)

module.exports = {
    DB: sequelize,
    user: user(sequelize, DataTypes),
    clothesCollection: clothesCollect,
    foodCollection: foodCollect

}