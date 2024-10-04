const mongoose=require('mongoose');

const carSchema=mongoose.Schema({
    model:{type:String,required:true},
    year:{type:Number,required:true},
    type:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'CarType',
        required: true
    },
    price:{type:Number,required:true},
    transmission:{type:String,required:true},
    fuel:{type:String,required:true},
    insurance:{type:String,required:true},
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Car',carSchema);