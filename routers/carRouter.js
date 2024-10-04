const express=require('express');
const router=express.Router();
const carCtrl=require('../controllers/carCtrl');

router.post('/',carCtrl.addCar);
router.get('/',carCtrl.getCars);

module.exports=router;