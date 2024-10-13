const express=require('express')
const router=express.Router()
const reservationCtrl=require('../controllers/reservationCtrl')


router.post('/',reservationCtrl.addReservation)
router.get('/',reservationCtrl.getReservations)

module.exports=router