const express=require('express');
const roleCtrl=require('../controllers/roleCtrl');
const router=express.Router();


router.post('/',roleCtrl.addRole)
router.get('/',roleCtrl.getRoles)

module.exports=router
