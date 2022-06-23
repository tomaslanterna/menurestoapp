'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var MesaSchema=Schema({
    idMesa:Number,
    name:String,
    urlQR:String
});

module.exports==mongoose.model('Mesa',MesaSchema);