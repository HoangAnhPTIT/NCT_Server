const express = require('express')
const routes = require('./routes/index')
const app = express()
const { createDb } = require('./model')
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)

const port = 8080

createDb()

app.use(routes)

routes.forEach(route => {
  app.use('/api/v1', route)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
