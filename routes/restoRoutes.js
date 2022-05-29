'use strict'

var express=require('express');
var RestoController=require('../controllers/restoControllers');
var KeyQR=require('../controllers/keyController');

var router=express.Router();

router.get('/resto/:id/:key',RestoController.getResto);
router.get('/resto',ensureToken,RestoController.getRestos);
router.post('/resto',ensureToken,RestoController.saveResto);
router.post('/login',RestoController.login);
router.post('/QRAuth',KeyQR.saveKeyQR);

function ensureToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        return res.status(410).send({
            status: 'error',
            message: 'Token no existe'
        });
    }

}


module.exports=router;