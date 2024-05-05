const express = require('express');

const authentication = require('./components/authentication/authentication-route');
const users = require('./components/users/users-route');
const transactionLogs = require('./components/transaction-logs/transaction-logs-route');

module.exports = () => {
  const app = express.Router();

  authentication(app);
  users(app);
  transactionLogs(app);

  return app;
};
