const Car=require("../models/Car")

exports.addCar=(req,res,next)=>{
    const car=new Car(
        ...req.body
    )
    car.save()
    .then((c)=>res.status(201).json(c))
    .catch(error=> res.status(400).json({error}))
}

exports.getCars=(req,res,next)=>{
    Car.find()
    .then((c)=>res.status(201).json(c))
    .catch(error=> res.status(400).json({error}))
}