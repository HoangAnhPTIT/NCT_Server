const { Users, db } = require('../model')

async function createUser (data) {
  const Transaction = await db.transaction()
  try {
    const user = await Users.create(data, { transaction: Transaction })
    await Transaction.commit()
    return user
  } catch (error) {
    await Transaction.rollback()
    throw error
  }
}

module.exports = {
  createUser
}
