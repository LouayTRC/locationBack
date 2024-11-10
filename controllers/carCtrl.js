const Car = require("../models/Car")
const Reservation = require("../models/Reservation")
const Category = require('../models/Category')
const Marque = require("../models/Marque")

exports.addCar = async (req, res, next) => {
  try {
    console.log("req",req.body);
    
    const category = await Category.findOne({ name: req.body.category })
    const marque = await Marque.findOne({ name: req.body.marque })

    delete req.body.category;
    delete req.body.marque;

    const car = new Car({
      ...req.body
    })
    
    
    car.category=category
    car.marque=marque
    car.status=1

    car.save()
      .then((c) => res.status(201).json(c))
      .catch(error => {res.status(400).json({ error });
    console.log(error);
    })
  } catch (error) {
    res.status(500).json({ error })
  }

}

exports.getCars = async (req, res, next) => {
  try {
    const cars= await Car.find().populate("category").populate("marque")
    res.status(200).json(cars)
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getCarById = async (req, res, next) => {
  try {
    const car= await Car.findOne({_id:req.params.id}).populate("category").populate("marque")
    res.status(200).json(car)
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getDisponibility = async (req, res, next) => {
  try {

    const existingReservation = await Reservation.findOne({
      car: req.params.id,
      $or: [
        {
          dateStart: { $lte: new Date(req.body.endDate) },
          dateEnd: { $gte: new Date(req.body.startDate) },
        },
      ],
    });

    if (existingReservation) {
      return res.status(200).json(false);
    }

    return res.status(200).json(true);
  } catch (error) {
    return res.status(500).json(error);
  }
};


exports.updateCarStatus = (req, res, next) => {
  Car.updateOne({_id: req.params.id}, {status: req.body.status, _id: req.params.id})
    .then(() => res.status(200).json({message: 'Status Modifié'}))
    .catch(error => res.status(400).json({error}));
};

exports.deleteCar=(req,res,next)=>{
  Car.deleteOne({_id:req.params.id})
  .then(()=>res.status(200).json(true))
  .catch((error)=>res.status(400).json(error))
}

exports.updateCar=(req,res,next)=>{
  Car.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  .then(async (car)=>{
    car=await Car.findOne({_id: req.params.id}).populate('marque').populate("category")
    res.status(200).json(car)
  })
  .catch((error)=>res.status(400).json(error))
}