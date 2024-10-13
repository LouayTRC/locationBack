const mongoose=require('mongoose');

const carSchema=mongoose.Schema({
    model:{type:String,required:true},
    price:{type:Number,required:true},
    features:{type:String,required:true},
    description:{type:String,required:true},
    picture:{type:String},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    marque:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Marque'
    },
    picture:{type:String},
    status:{type:Number,required:true}
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Car',carSchema);