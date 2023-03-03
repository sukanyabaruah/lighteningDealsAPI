const express = require('express');
const router = express.Router();

const {createNewUser,userLogin,changePassword} = require('../controllers/authController')



router.route('/api/register').post(createNewUser)
router.route('/api/login').post(userLogin)
router.route('/api/changePassword').post(changePassword);

module.exports = router;