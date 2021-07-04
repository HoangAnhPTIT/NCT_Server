const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const app = express()
const jsonwebtoken = require('jsonwebtoken')
const { createDb } = require('./model')
app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

const port = 8080

createDb()

// app.use(routes)

// app.use(function (req, res, next) {
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//     jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
//       if (err) req.user = undefined
//       req.user = decode
//       next()
//     })
//   } else {
//     req.user = undefined
//     next()
//   }
// })

routes.forEach(route => {
  console.log(route)
  app.use('/api/v1', route)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
