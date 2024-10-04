const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');

const userSchema=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    fullname:{type:String,required:true},
    role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role'
    },
    pdp:{type:String,required:true},
},{ versionKey: false,timestamps: true});

userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);