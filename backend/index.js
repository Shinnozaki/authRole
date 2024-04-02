const express = require('express')
const cors = require('cors')
const session = require('express-session')
const env = require('dotenv');

const userRoute = require('./routes/UserRoute')
const productRoute = require('./routes/ProductRoute')
const authRoute = require('./routes/AuthRoute')

const SequelizeStore = require('connect-session-sequelize')
const db = require("./config/database")

env.config()

const app = express();

const sessionStore = SequelizeStore(session.Store)
const store = new sessionStore({
    db: db
})

//buat jalanin query create table
// (async() => {
//     await db.sync()
// })()

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000' //untuk sambungin ke front end (react)
}))

app.use(express.json())

app.use(userRoute)
app.use(productRoute)
app.use(authRoute)

store.sync()

app.listen(process.env.APP_PORT, () => {
    console.log('server up and running.')
})