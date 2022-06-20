'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema; //Es para utilizar un objeto de este tipo

var RestoSchema=Schema({ //Defino estructura de objeto
    name:String,
    description:String,
    menu:[],
    mesas:[],
    dateCreated:{type:Date,default:Date.now},
    image:String
});

module.exports=mongoose.model('Resto',RestoSchema); //Cuando utilice el modelo Resto, plurariza el orden y crea coleccion