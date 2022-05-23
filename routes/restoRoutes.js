'use strict'

var express=require('express');
var RestoController=require('../controllers/restoControllers');

var router=express.Router();

router.get('/resto/:id',RestoController.getResto);
router.get('/resto',RestoController.getRestos);
router.post('/resto',RestoController.saveResto);

module.exports=router;