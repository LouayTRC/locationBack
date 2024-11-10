const express=require('express');
const router=express.Router();
const carCtrl=require('../controllers/carCtrl');

router.post('/verif/:id',carCtrl.getDisponibility);
router.post('/',carCtrl.addCar);
router.get('/:id',carCtrl.getCarById);
router.get('/',carCtrl.getCars);
router.delete("/:id", carCtrl.deleteCar);
router.put("/status/:id", carCtrl.updateCarStatus);
router.put("/:id", carCtrl.updateCar);

module.exports=router;