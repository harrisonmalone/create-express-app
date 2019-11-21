const express = require('express')
const router = express.Router()

const {
  register,
  login,
  confirmLogin,
  logout,
} = require('../controllers/users-controller')

router.post('/register', express.json(), register)

router.post('/login', express.json(), login, confirmLogin)

router.post('/logout', logout)

module.exports = router
