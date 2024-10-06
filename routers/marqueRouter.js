const express=require('express');
const router=express.Router();
const marqueCtrl=require('../controllers/marqueCtrl');

router.post('/',marqueCtrl.addMarque);
router.get('/',marqueCtrl.getMarques);

module.exports=router;