const mongoose=require('mongoose')

const messageSchema=mongoose.Schema({
    sender:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },
    discussion:{
        type:mongoose.Schema.ObjectId,
        ref:'Discussion'
    },
    description:{
        type:String,
    }
},{versionKey:false,timestamps:true})

module.exports=mongoose.model('Message',messageSchema)