const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');

const { createOrder, getCurrentUserOrders, getAllOrders, deleteOrder } = require('../controllers/orderController');

router
  .route('/')
  .post(authenticateUser, createOrder)
  .get([authenticateUser, authorizePermissions('admin')], getAllOrders)

router
  .route('/find/:userId').get(authenticateUser, getCurrentUserOrders)

router
  .route('/:id').delete([authenticateUser, authorizePermissions('admin')], deleteOrder)


module.exports = router;
