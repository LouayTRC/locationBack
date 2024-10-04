const carType=require("../models/CarType")

exports.addCarType=(req,res,next)=>{
    const carType=new CarType(
        name=req.body.name
    )
    carType.save()
    .then((c)=>res.status(201).json(c))
    .catch(error=> res.status(400).json({error}))
}

exports.getCarTypes=(req,res,next)=>{
    carType.find()
    .then((c)=>res.status(200).json(c))
    .catch(error=> res.status(400).json({error}))
}