const express=require('express')
const router=express.Router()
const reservationCtrl=require('../controllers/reservationCtrl')


router.post('/',reservationCtrl.addReservation)
router.get('/:id',reservationCtrl.getReservationById)
router.get('/user/:id',reservationCtrl.getReservationByUserId)
router.get('/',reservationCtrl.getReservations)
router.put('/:id/:status',reservationCtrl.updateReservationStatus)

module.exports=router