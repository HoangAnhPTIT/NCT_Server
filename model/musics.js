const { DataTypes } = require('sequelize')
const db = require('../config/database')
const Categories = require('./categories')
const Musics = db.define('musics', {
  name: {
    type: DataTypes.STRING,
    field: 'name',
    allowNull: false
  },
  url: {
    type: DataTypes.STRING,
    field: 'url',
    allowNull: false,
    isUrl: true
  },
  thumbnail: {
    type: DataTypes.STRING,
    field: 'thumbnail',
    allowNull: true
  },
  totalListen: {
    type: DataTypes.BIGINT,
    field: 'total_listen',
    allowNull: false,
    defaultValue: 0
  }
  // uploadBy
})
Musics.belongsToMany(Categories, { through: 'Categories_Musics' })

module.exports = Musics
