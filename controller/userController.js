const { Users } = require('../model')
async function getAll (req, res) {
  try {
    const users = await Users.findAll().catch(err => {
      throw err
    })
    res.status(200).json(users)
  } catch (err) {
    res.status(400).json(err)
  }
}

module.exports = {
  getAll
}
