const express=require('express');
const router=express.Router();
const carCtrl=require('../controllers/carCtrl');

router.post('/verif/:id',carCtrl.getDisponibility);
router.post('/',carCtrl.addCar);
router.get('/',carCtrl.getCars);
router.put("/:id", carCtrl.updateCarStatus);

module.exports=router;