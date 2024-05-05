const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const transactionLogsControllers = require('./transaction-logs-controller');
const transactionLogsValidator = require('./transaction-logs-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/transaction-logs', route);

  // Get list of transactionLogs
  route.get(
    '/',
    authenticationMiddleware,
    transactionLogsControllers.getTransactionLogss
  );

  // Create user
  route.post(
    '/',
    authenticationMiddleware,
    celebrate(transactionLogsValidator.createTransactionLogs),
    transactionLogsControllers.createTransactionLogs
  );

  // Get user detail
  route.get(
    '/:id',
    authenticationMiddleware,
    transactionLogsControllers.getTransactionLogs
  );

  // Update user
  route.put(
    '/:id',
    authenticationMiddleware,
    celebrate(transactionLogsValidator.updateTransactionLogs),
    transactionLogsControllers.updateTransactionLogs
  );

  // Delete user
  route.delete(
    '/:id',
    authenticationMiddleware,
    transactionLogsControllers.deleteTransactionLogs
  );
};
