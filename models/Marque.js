const mongoose=require('mongoose');

const marqueSchema=mongoose.Schema({
    name:{type:String,required:true},
},{versionKey:false,timestamps: true});

module.exports = mongoose.models.Marque || mongoose.model('Marque', marqueSchema);