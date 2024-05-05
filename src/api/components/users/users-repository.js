const { User, TransactionLogs } = require('../../../models');
// const { account_status } = require('../../../models/users-schema');

/**
 * Get a list of users
 * @returns {Promise}
 */
async function getUsers() {
  // return User.find({});
  return User.aggregate([
    {
      $lookup: {
        from: 'investment_deposits',
        localField: 'email',
        foreignField: 'email',
        as: 'investment_deposits',
      },
    },
  ]);
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(
  name,
  email,
  password,
  role = 'admin',
  account_status = true,
  balance = 0
) {
  return User.create({
    name,
    email,
    password,
    role,
    account_status,
    balance,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

async function addDeposit(id, amount) {
  const user = await User.findById(id);
  await TransactionLogs.create({
    email: user.email,
    type: 'deposit',
    amount,
    message: `Deposit ${amount}`,
  });

  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        balance: user.balance + amount,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

async function verified(id) {
  return User.updateOne({ _id: id }, { $set: { account_status: true } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
  addDeposit,
  verified,
};
