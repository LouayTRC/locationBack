const express=require('express');
const router=express.Router();
const categoryCtrl=require('../controllers/categoryCtrl');

router.post('/',categoryCtrl.addcategory);
router.get('/',categoryCtrl.getcategorys);

module.exports=router;