const express=require('express');
const authCtrl=require('../controllers/authCtrl');
const router=express.Router();

router.post('/login',authCtrl.login);
router.post('/signupC',authCtrl.clientSignup);
router.post('/signupD',authCtrl.driverSignup);
router.post('/verify',authCtrl.verifyToken);
router.post('/addAdmin',authCtrl.addAdmin);

module.exports=router;