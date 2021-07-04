const express = require('express')
const cors = require('cors')
const routes = require('./routes/index')
const app = express()
const { validator } = require('./util/validator')
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

app.use(validator)
routes.forEach((route) => {
  app.use('/api/v1', route)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
