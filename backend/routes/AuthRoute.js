const express = require("express")
const {login, logout, session} = require("../controllers/auth")

const router = express.Router()

router.get('/session', session)
router.post('/login', login)
router.delete('/logout', logout)

module.exports = router