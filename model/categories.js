const DataTypes = require('sequelize')
const db = require('../config/database')
const Categories = db.define('categories', {
  name: {
    type: DataTypes.STRING,
    field: 'name'
  },
  code: {
    type: DataTypes.STRING,
    field: 'code'
  }
})

module.exports = Categories
