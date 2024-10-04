const mongoose=require('mongoose');

const carTypeSchema=mongoose.Schema({
    name:{type:String,required:true},
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('CarType',carTypeSchema);