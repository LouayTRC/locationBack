const mongoose=require('mongoose');

const reservationSchema=mongoose.Schema({
    client:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client'
    },
    car:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car'
    },
    locationLong:{type:String},
    locationLat:{type:String},
    driver:{type:Boolean,required:true},
    dateStart:{type:Date,required:true},
    dateEnd:{type:Date,required:true},
    status:{type:Number,required:true},
    total:{type:Number,required:true},
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Reservation',reservationSchema);