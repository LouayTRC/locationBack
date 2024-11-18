const mongoose=require('mongoose');

const driverSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    region:{type:String},
    priceByDay:{type:Number},
    reservations: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reservation'
    }],
    genre:{type:String}
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Driver',driverSchema);