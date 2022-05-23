'use strict'

//Cargar modulos de node para crear el server
var express=require('express');
var bodyParser=require('body-parser');


//Ejecutar express para trabajar con http
var app=express();

//Cargar ficheros y rutas
var restoRoutes=require('../backend/routes/restoRoutes');


//Cargar middlewares
app.use(bodyParser.urlencoded({extended:false})); //Cargar el bodyparser
app.use(bodyParser.json()); //Convertimos el mismo a json, cualquier tipo de peticion a JSON

//CORS- permitir peticiones desde frontend
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//Agregar prefijos a rutas
app.use('/api',restoRoutes);

//Exportar modulo-fichero actual
module.exports=app;