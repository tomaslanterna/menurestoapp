'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var KeyQRSchema=Schema({
    key:String,
    dateCreated:{type:Date,default:Date.now}
});

module.exports=mongoose.model('KeyQR',KeyQRSchema);