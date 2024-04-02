const { Sequelize } = require("sequelize");

const db = new Sequelize('authRoleee', 'postgres', '', {
    host: "localhost",
    dialect: "postgres",
    password: '123456'
})

module.exports = db
