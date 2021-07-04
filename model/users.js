const DataTypes = require('sequelize')
const db = require('../config/database')
const bcrypt = require('bcrypt')
const saltRounds = 10
const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: DataTypes.STRING,
    field: 'last_name'
  },
  fullName: {
    type: DataTypes.VIRTUAL,
    get () {
      return `${this.firstName} ${this.lastName}`
    },
    set (value) {
      throw new Error('Do not try to set the `fullName` value!')
    }
  },
  username: {
    type: DataTypes.STRING(32),
    field: 'username',
    // unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    field: 'email',
    // unique: true,
    isEmail: true
  },
  password: {
    type: DataTypes.STRING,
    field: 'password',
    set (value) {
      const hashValue = bcrypt.hashSync(value, saltRounds)
      this.setDataValue('password', hashValue)
    }
  },
  status: {
    type: DataTypes.BIGINT,
    field: 'status',
    defaultValue: 1 // Active
  }
})

module.exports = User
