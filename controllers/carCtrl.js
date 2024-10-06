const Car=require("../models/Car")
const Reservation=require("../models/Reservation")

exports.addCar=(req,res,next)=>{
    const car=new Car({
        ...req.body
    })
    car.save()
    .then((c)=>res.status(201).json(c))
    .catch(error=> res.status(400).json({error}))
}

exports.getCars=(req,res,next)=>{
    Car.find()
    .then((c)=>res.status(201).json(c))
    .catch(error=> res.status(400).json({error}))
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
        return res.status(200).json({
          message: "Voiture non disponible pour l'intervalle donné",
          dispo: false
        });
      }

      return res.status(200).json({
        message: "Voiture disponible pour l'intervalle donné",
        dispo: true
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  };
  