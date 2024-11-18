const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    description:{
        type:String,
    }
},{versionKey:false,timestamps:true})

module.exports=mongoose.model('Message',messageSchema)