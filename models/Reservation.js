const mongoose=require('mongoose');

const reservationSchema=mongoose.Schema({
    client:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client',
        required:true
    },
    car:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Car',
        required:true
    },
    driver:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Driver'
    },
    locationLong:{type:String},
    locationLat:{type:String},
    distanceEnKm:{type:Number},
    diffDays:{type:Number},
    dateStart:{type:Date,required:true},
    dateEnd:{type:Date,required:true},
    status:{type:Number,required:true},
    total:{type:Number,required:true},
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Reservation',reservationSchema);