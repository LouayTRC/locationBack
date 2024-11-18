const express=require('express')
const router=express.Router()
const userCtrl=require('../controllers/userCtrl')

router.post('/driver',userCtrl.addDriver)
router.get('/drivers',userCtrl.getDrivers)
router.post('/drivers/available',userCtrl.getAvailableDrivers)
router.get('/status/:id',userCtrl.updateStatus)
router.get('/',userCtrl.getUsers)

module.exports=router