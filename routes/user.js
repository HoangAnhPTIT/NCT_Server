const express = require('express')
const userRouter = express.Router()
const { singin } = require('../controller')

userRouter.post('/singin', (req, res) => {
  singin(req, res)
})

module.exports = userRouter
