const mongoose=require('mongoose')

const discussionSchema=mongoose.Schema({
    user1:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    user2:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Message'
        }
    ]
},{versionKey:false,timestamps: true})

module.exports=mongoose.model('Discussion',discussionSchema)
