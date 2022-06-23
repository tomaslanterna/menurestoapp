'use strict'

var validator = require('validator');
var path = require('path');
var Resto = require('../models/resto');
var Mesa=require('../models/mesa');
var jwt = require('jsonwebtoken');
var keyQR = require('../models/keyQR');
require('dotenv').config();
var fs = require('fs');
var qrcode = require('qrcode');

var controller = {

    login: (req, res) => {
        const user = { id: 3 };
        const token = jwt.sign({ user }, process.env.SECRET_KEY);

        return res.status(200).send({
            token,
            message: 'Token bridado'
        });

    },

    getResto: (req, res) => {

        //Tomamos id de url
        var restoId = req.params.id;
        var key = req.params.key;



        keyQR.findById(key, (err, key) => {
            if (err || !key) {
                return res.status(404).send({
                    status: 'error',
                    message: 'Key de mesa incorrecta'
                });
            }

            //Valido si el id existe
            if (!restoId || restoId == null) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el resto'
                });
            }

            //Busco el objeto en bd
            Resto.findById(restoId, (err, resto) => {
                if (err || !resto) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el resto'
                    });
                }
                const user = { id: 3 };
                const token = jwt.sign({ user }, process.env.SECRET_KEY);


                //Lo retorno como JSON
                return res.status(200).send({
                    status: 'succes',
                    resto,
                    token
                });
            });
        })


    },

    getRestos: (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                return res.status(403).send({
                    status: 'error',
                    message: 'Token no valido'
                });
            } else {
                var query = Resto.find({});
                var last = req.params.last;

                if (last || last != undefined) {
                    query.limit(5);
                }

                query.sort('-_id').exec((err, restos) => {
                    if (err) {
                        return res.status(500).send({
                            status: 'error',
                            message: 'Error al devolver restos'
                        });
                    }
                    if (!restos) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No hay restos para mostrar'
                        });
                    }
                    return res.status(200).send({
                        status: 'success',
                        restos,
                        data
                    });
                });
            }
        })
    },

    saveResto: (req, res) => {
        var params = req.body;

        try {
            //Valido datos que llegan por ruta
            var validate_name = !validator.isEmpty(params.name);
            var validate_description = !validator.isEmpty(params.description);
            //var validate_menu=!validator.isEmpty(params.menu);

        } catch (error) {
            return res.status(400).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_name && validate_description) {

            //Creo el objeto a guardar
            var resto = new Resto();

            //Se asignan valores a dato a guardar
            resto.name = params.name;
            resto.description = params.description;
            resto.menu = params.menu;
            resto.mesas = params.mesas;
            resto.image = null;


            //Se guarda dato
            resto.save((err, restoStored) => {
                if (err || !restoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El resto no se guardo'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    resto: restoStored
                });
            });
        } else {
            return res.status(410).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
    },

    generateQr: (req, res) => {
        jwt.verify(req.token, process.env.SECRET_KEY, (err, data) => {
            if (err) {
                return res.status(403).send({
                    status: 'error',
                    message: 'Token no valido'
                });
            } else {
                var params = req.body;
                var url = params.url;
                var restoId=params.restoId;
                var mesaId=params.mesaId;
                var QrUrl;

                const run = async () => {
                    const QR = await qrcode.toDataURL(url);
                    /*return res.status(200).send({
                        imgUrl: QR,
                        message: 'QR creado correctamente',
                        data
                    });*/
                    QrUrl=QR;
                }
                run();

                Resto.findById(restoId, (err, resto) => {
                    if (err || !resto) {
                        return res.status(404).send({
                            status: 'error',
                            message: 'No existe el resto'
                        });
                    }
                })
            }
        })
    }
}

module.exports = controller;