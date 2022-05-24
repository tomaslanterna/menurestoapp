'use strict'

var mongoose = require('mongoose');
var app=require('./app');
var port= process.env.PORT || 3800;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb+srv://tomi:Sanantonio20$@restoappcluster.iunel.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log('La conexion a la db se a realizado bien');
        //Crear servidor y me pongo a escuchar peticiones https

        app.listen(port,()=>{
            console.log('servidor corriendo en http://localhost:'+port);

        });

    });
