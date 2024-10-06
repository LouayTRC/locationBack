const Car = require("../models/Car")
const Reservation = require("../models/Reservation")
const Category = require('../models/Category')
const Marque = require("../models/Marque")

exports.addCar = async (req, res, next) => {
  try {
    
    const category = await Category.findOne({ _id: req.body.category })
    const marque = await Marque.findOne({ _id: req.body.marque })

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

exports.getCars = (req, res, next) => {
  Car.find()
    .then((c) => res.status(201).json(c))
    .catch(error => res.status(400).json({ error }))
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
