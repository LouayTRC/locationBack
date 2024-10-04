const express=require('express');
const router=express.Router();
const carTypeCtrl=require('../controllers/carTypeCtrl');

router.post('/',carTypeCtrl.addCarType);
router.get('/',carTypeCtrl.getCarTypes);

module.exports=router;