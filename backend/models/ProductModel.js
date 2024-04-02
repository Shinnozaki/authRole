const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Users = require("./UserModel");

const{DataTypes} = Sequelize;

const Products = db.define('products', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {

    freezeTableName: true
})

Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey: "userId"})

module.exports = Products