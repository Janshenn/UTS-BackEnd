const mongoose = require('mongoose');
const config = require('../core/config');
const logger = require('../core/logger')('app');

const usersSchema = require('./users-schema');
const loginAttempsSchema = require('./login-attemps-schema');
const userLogSchema = require('./users-logs-schema');
const transactionLogsSchema = require('./transaction-logs-schema');

mongoose.connect(`${config.database.connection}/${config.database.name}`, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
  logger.info('Successfully connected to MongoDB');
});

const User = mongoose.model('users', mongoose.Schema(usersSchema));
const LoginAttemp = mongoose.model(
  'login_attemps',
  mongoose.Schema(loginAttempsSchema)
);
const UserLog = mongoose.model('user_logs', mongoose.Schema(userLogSchema));
const TransactionLogs = mongoose.model(
  'transaction_logs',
  mongoose.Schema(transactionLogsSchema)
);

module.exports = {
  mongoose,
  User,
  UserLog,
  LoginAttemp,
  TransactionLogs,
};
