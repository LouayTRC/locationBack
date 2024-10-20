const Car = require("../models/Car")
const Reservation = require("../models/Reservation")
const Category = require('../models/Category')
const Marque = require("../models/Marque")

exports.addCar = async (req, res, next) => {
  try {
    
    const category = await Category.findOne({ name: req.body.category })
    const marque = await Marque.findOne({ name: req.body.marque })

    delete req.body.category;
    delete req.body.marque;

    const car = new Car({
      ...req.body
    })
    
    
    car.category=category
    car.marque=marque

    car.save()
      .then((c) => res.status(201).json(c))
      .catch(error => res.status(400).json({ error }))
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

exports.getCarById = async (req, res) => {
  const carId = req.params.id;
  if (!carId) {
      return res.status(400).json({ error: "Car ID is required" });
  }

  try {
      if (!mongoose.Types.ObjectId.isValid(carId)) {
          return res.status(400).json({ error: "Invalid car ID" });
      }

      const car = await Car.findById(carId);
      if (!car) {
          return res.status(404).json({ error: "Car not found" });
      }
      res.status(200).json(car);
  } catch (error) {
      res.status(500).json({ error });
  }
};


exports.updateCarStatus = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const { status } = req.body.status; 

    const updatedCar = await Car.findByIdAndUpdate(
      id,
      { status }, 
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    res.status(500).json({ error });
  }
};