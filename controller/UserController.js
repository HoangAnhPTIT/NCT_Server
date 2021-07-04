const Joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Users } = require('../model')
const { createUser } = require('../service/userService')
function createSchemaSingin () {
  const schema = Joi.object({
    username: Joi.string().min(7).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7)// eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })

  return schema
}

function createSchemaLogin () {
  const schema = Joi.object({
    username: Joi.string().min(7).max(30).required(),
    password: Joi.string().min(7)// eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
  })

  return schema
}

function comparePassword (password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

async function register (req, res) {
  const schema = createSchemaSingin()
  try {
    const body = await schema.validateAsync(req.body)
    const user = await createUser(body)
    res.status(200).send({ message: 'Create user success', user: user })
  } catch (err) {
    res.status(400).send(err)
  }
}

async function login (req, res) {
  const schema = createSchemaLogin()
  try {
    const body = await schema.validateAsync(req.body)
    const user = await Users.findOne({
      where: {
        username: body.username
      }
    }).then(res => {
      return res
    }).catch(error => {
      throw error
    })
    console.log(body.password, user.password, comparePassword(body.password, user.password))
    if (comparePassword(body.password, user.password)) {
      res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') })
    } else {
      throw new Error('Wrong username | password')
    }
  } catch (err) {
    res.status(400).json(err)
  }
}

async function loginRequired (req, res, next) {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

module.exports = {
  register,
  login,
  loginRequired
}
