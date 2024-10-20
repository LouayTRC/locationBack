const Reservation=require('../models/Reservation')
const Car=require('../models/Car')
const dayjs=require('dayjs')

exports.addReservation = async (req, res, next) => {
    console.log("gerer");
    
    var somme=0;
    const car=await Car.findOne({_id:req.body.carId})
    console.log(car);
    
    if(car.status==1){
        const { dateStart, dateEnd } = req.body;
        const startDate = dayjs(dateStart);
        const endDate = dayjs(dateEnd);

        const diffInDays = endDate.diff(startDate, 'day');
        console.log("Difference in days:", diffInDays);
        somme+=car.price*diffInDays;


    }
    
    res.status(200).json({ message: 'mrigel', somme: somme });
};
exports.getReservations=async (req,res,next)=>{
   try {
        const reservations=await Reservation.find()
        res.status(200).json(reservations)
   } catch (error) {
        res.status(400).json(error)
   }
    
}