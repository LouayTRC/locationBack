const mongoose=require('mongoose');

const roleSchema=mongoose.Schema({
    name:{type:String,required:true},
},{versionKey:false,timestamps: true});

module.exports = mongoose.models.Role || mongoose.model('Role', roleSchema);