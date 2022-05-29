'use strict'

var validator=require('validator');
var KeyQR=require('../models/keyQR');

var controller={
    saveKeyQR:(req,res)=>{
        var params=req.body;

        try {

            var validate_key=!validator.isEmpty(params.key);
            
        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if(validate_key){
            var keyQR=new KeyQR();

            keyQR.key=params.key;

            keyQR.save((err,saveQRStored)=>{
                if(err||!saveQRStored){
                    return res.status(404).send({
                        status: 'error',
                        message: 'Key no se guardo'
                    });
                }
                return res.status(200).send({
                    status: 'success'
                });
            });
        }else{
            return res.status(410).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    }
}

module.exports=controller;