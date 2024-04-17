const express = require('express');
const router = express.Router();

const userCtrl = require("../controllers/user.controller");

router.post('/create_user',userCtrl.create);

router.post('/auth',userCtrl.auth_login);

router.post('/get-details', userCtrl.get_users)




module.exports = router;