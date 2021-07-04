const jsonwebtoken = require('jsonwebtoken')

const validator = function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err) req.user = undefined
      req.user = decode
      next()
    })
  } else {
    req.user = undefined
    next()
  }
}

const loginRequired = function (req, res, next) {
  if (req.user) {
    next()
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' })
  }
}

module.exports = { validator, loginRequired }
