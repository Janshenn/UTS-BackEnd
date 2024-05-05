const { User } = require('../../../models');
const { message } = require('../../../models/users-logs-schema');
const transactionLogsService = require('./transaction-logs-service');

async function getTransactionLogss(request, response, next) {
  try {
    const transactionLogs = await transactionLogsService.getTransactionLogss(
      request.query.page_number,
      request.query.page_size,
      request.user.email,
      request.query.search,
      request.query.sort
    );
    response.json(transactionLogs);
  } catch (error) {
    next(error);
  }
}

async function getTransactionLogs(request, response, next) {
  try {
    const transactionLog = await transactionLogsService.getTransactionLogs(
      request.params.id
    );
    response.json(transactionLog);
  } catch (error) {
    next(error);
  }
}

async function createTransactionLogs(request, response, next) {
  try {
    // console.log('request.user', request.user)
    // return response.status(400).json({ message: 'This API is not implemented yet' });

    const source = await User.findOne({ email: request.user.email });
    if (!source) {
      return response.status(400).json({ message: 'Source user not found' });
    }
    if (source.balance < request.body.amount) {
      return response.status(400).json({ message: 'Insufficient balance' });
    }

    const to = await User.findOne({ email: request.body.to_email });
    if (!to) {
      return response
        .status(400)
        .json({ message: 'Destination user not found' });
    }

    const data = {
      ...request.body,
      type: 'sent money',
      email: request.user.email,
      message: `${request.user.name} sent ${request.body.amount} to ${to.name}`,
    };

    const transactionLog =
      await transactionLogsService.createTransactionLogs(data);
    response.status(201).json(transactionLog);
  } catch (error) {
    next(error);
  }
}

async function updateTransactionLogs(request, response, next) {
  try {
    const transactionLog = await transactionLogsService.updateTransactionLogs(
      request.params.id,
      request.body
    );
    response.json(transactionLog);
  } catch (error) {
    next(error);
  }
}

async function deleteTransactionLogs(request, response, next) {
  try {
    await transactionLogsService.deleteTransactionLogs(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTransactionLogss,
  getTransactionLogs,
  createTransactionLogs,
  updateTransactionLogs,
  deleteTransactionLogs,
};
