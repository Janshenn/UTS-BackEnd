const { errorResponder, errorTypes } = require('../../../core/errors');
const { TransactionLogs, User } = require('../../../models');

async function getTransactionLogss(email = '') {
  return await TransactionLogs.find({ email });
}

async function getTransactionLogs(id) {
  return await TransactionLogs.findById(id);
}

async function createTransactionLogs(data) {
  const investment = new TransactionLogs(data);

  const source = await User.findOne({ email: data.email });
  await User.updateOne(
    { email: data.email },
    { $set: { balance: parseFloat(source.balance) - parseFloat(data.amount) } }
  );

  const to = await User.findOne({ email: data.to_email });
  await User.updateOne(
    { email: data.to_email },
    { $set: { balance: parseFloat(to.balance) + parseFloat(data.amount) } }
  );

  return await investment.save();
}

async function updateTransactionLogs(id, data) {
  return await TransactionLogs.findByIdAndUpdate(id, data, { new: true });
}

async function deleteTransactionLogs(id) {
  return await TransactionLogs.findByIdAndRemove(id);
}

async function getTransactionLogsByEmail(email) {
  return TransactionLogs.findOne({ email });
}

module.exports = {
  getTransactionLogss,
  getTransactionLogs,
  createTransactionLogs,
  updateTransactionLogs,
  deleteTransactionLogs,
  getTransactionLogsByEmail,
};
