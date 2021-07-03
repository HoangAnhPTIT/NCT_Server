const Joi = require('joi')
const { Users } = require('../model')
function createSchemaSingin () {
  const schema = Joi.object({
    email: Joi.string().email(),
    password: Joi.string()// eslint-disable-next-line prefer-regex-literals
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  return schema
}

async function singin (req, res) {
  const schema = createSchemaSingin()
  try {
    const body = await schema.validateAsync(req.body)
    const user = await Users.create(body)
    res.status(200).send({ message: 'Create user success', user: user })
  } catch (err) {
    res.status(400).send(err)
  }
}

module.exports = {
  singin
}
