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
  email: {
    type: DataTypes.STRING,
    field: 'email',
    isEmail: true
  },
  password: {
    type: DataTypes.STRING,
    field: 'password',
    set (value) {
      bcrypt.hash(value, saltRounds, function (err, hashValue) {
        if (err) throw err
        this.setDataValue('password', hashValue)
      })
    }
  },
  status: {
    type: DataTypes.BIGINT,
    field: 'status',
    defaultValue: 1 // Active
  }
})

module.exports = User
