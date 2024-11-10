const express=require('express');
const authCtrl=require('../controllers/authCtrl');
const router=express.Router();

router.post('/login',authCtrl.login);
router.post('/signup',authCtrl.signup);
router.post('/verify',authCtrl.verifyToken);

module.exports=router;