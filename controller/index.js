const { register, login } = require('./auth')
const { getAll } = require('./userController')
module.exports = {
  register,
  login,
  getAll
}
