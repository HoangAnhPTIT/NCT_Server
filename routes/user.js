const express = require('express')
const userRouter = express.Router()
const { register, login } = require('../controller')

userRouter.post('/register', (req, res) => {
  register(req, res)
})
userRouter.post('/login', (req, res) => {
  login(req, res)
})
module.exports = userRouter
