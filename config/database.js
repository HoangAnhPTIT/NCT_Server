const Sequelize = require('sequelize')
const config = require('config')
const sequelize = new Sequelize(config.get('postgrestUrlConnect'), {
  define: {
    freezeTableName: true
  }
})

module.exports = sequelize
