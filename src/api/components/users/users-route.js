const express = require('express');

const middle = require('../../middlewares/admin-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const usersControllers = require('./users-controller');
const usersValidator = require('./users-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/users', route);

  // Get list of users
  route.get('/', middle, usersControllers.getUsers);

  // Create user
  route.post(
    '/',
    middle,
    celebrate(usersValidator.createUser),
    usersControllers.createUser
  );

  // Get user detail
  route.get('/:id', middle, usersControllers.getUser);

  // Update user
  route.put(
    '/:id',
    middle,
    celebrate(usersValidator.updateUser),
    usersControllers.updateUser
  );

  // Delete user
  route.delete('/:id', middle, usersControllers.deleteUser);

  // Change password
  route.post(
    '/:id/change-password',
    middle,
    celebrate(usersValidator.changePassword),
    usersControllers.changePassword
  );

  // DEPOSIT
  route.post(
    '/:id/deposit',
    middle,
    celebrate(usersValidator.deposit),
    usersControllers.deposit
  );

  // VERIFIED
  route.post('/:id/verified', middle, usersControllers.verified);
};
