'use strict'

var mongoose = require('mongoose');
var app=require('./app');
var port=3800;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/menurestos', { useNewUrlParser: true })
    .then(() => {
        console.log('La conexion a la db se a realizado bien');
        //Crear servidor y me pongo a escuchar peticiones http

        app.listen(port,()=>{
            console.log('servidor corriendo en http://localhost:'+port);

        });

    });
