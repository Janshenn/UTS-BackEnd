const joi = require('joi');

module.exports = {
  createTransactionLogs: {
    body: {
      // email: joi.string().email().required().label('Email'),
      // type: joi.string().valid('in', 'out').required().label('Type'),
      to_email: joi.string().email().required().label('To Email'),
      amount: joi.number().positive().required().label('Amount'),
      // message: joi.string().min(1).max(500).required().label('Message'),
    },
  },

  updateTransactionLogs: {
    body: {
      email: joi.string().email().label('Email'),
      // type: joi.string().valid('in', 'out').label('Type'),
      to_email: joi.string().email().label('To Email'),
      amount: joi.number().positive().label('Amount'),
      message: joi.string().min(1).max(500).label('Message'),
    },
  },
};
