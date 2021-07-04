const Users = require('./users')
const Musics = require('./musics')
const Categories = require('./categories')
const db = require('../config/database')

async function createDb () {
  await db.sync({ alter: true })
}

module.exports = {
  Users,
  Musics,
  Categories,
  createDb,
  db
}
