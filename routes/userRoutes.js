const express=require('express');
const authController=require('./../controllers/authController');

const router=express.Router();

router.post('/register',authController.signup);
router.post('/login',authController.login);
router.get('/logout',authController.protect,authController.logout);

module.exports = router;