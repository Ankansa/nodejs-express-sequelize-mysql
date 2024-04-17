var express = require('express');
var router = express.Router();



// router.use('/user',require('./user'));
console.log("User router mounted successfully.");
var verifyToken = require('../helper')


const userCtrl = require("../controllers/user.controller");

router.post('/create_user',userCtrl.create);

router.post('/auth',userCtrl.auth_login);

// router.post('/get-details', userCtrl.get_users)

router.get('/get-details', verifyToken, userCtrl.all_user);

module.exports = router;
