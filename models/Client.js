const mongoose=require('mongoose');

const clientSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
},{versionKey:false,timestamps: true});

module.exports=mongoose.model('Client',clientSchema);