const mongoose=require('mongoose');
// const uniqueValidator=require('mongoose-unique-validator');

const userSchema=mongoose.Schema({
    email:{type:String,required:true},
    phone:{type:String,required:true},
    cin:{type:String,required:true},
    name:{type:String,required:true},
    // role:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Role'
    // },
    // pdp:{type:String,required:true},
},{ versionKey: false,timestamps: true});

// userSchema.plugin(uniqueValidator);

module.exports=mongoose.model('User',userSchema);