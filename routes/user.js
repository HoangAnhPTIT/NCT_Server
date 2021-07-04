const express = require('express')
const userRouter = express.Router()
const { getAll } = require('../controller/userController')
const { loginRequired } = require('../util/validator')
userRouter.get('/users', loginRequired, getAll)
module.exports = userRouter
