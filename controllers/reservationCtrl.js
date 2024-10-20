const Reservation=require('../models/Reservation')
const Car=require('../models/Car')
const Location=require('../models/Location')
const dayjs=require('dayjs')

exports.addReservation = async (req, res, next) => {
    const localLocation=new Location(36.851256, 10.211287)
    const driverPriceByDay=50;
    const priceByKm=2;
    var somme=0;
    // const car=await Car.findOne({_id:req.body.carId})
    // console.log(car);
    
    if(true){
        let driver=false;
        const { dateStart, dateEnd } = req.body;
        const startDate = dayjs(dateStart);
        const endDate = dayjs(dateEnd);

        const diffInDays = endDate.diff(startDate, 'day');
        console.log("Difference in days:", diffInDays);
        somme+=120*diffInDays;

        if (req.body.location) {
            somme+=localLocation.distanceTo(req.body.location)*priceByKm
        }

        if (req.body.driver) {
            driver=true
            somme+=driverPriceByDay*diffInDays
        }

        const reservation=new Reservation({
            locationLong:req.body.location.longitude,
            locationLat:req.body.location.latitude,
            driver:driver,
            dateStart:startDate,
            dateEnd:endDate,
            status:0,
            total:somme.toFixed(3)
        })

        console.log(reservation);
        

    }
    
    res.status(200).json({ message: 'mrigel'});
};
exports.getReservations=async (req,res,next)=>{
   try {
        const reservations=await Reservation.find()
        res.status(200).json(reservations)
   } catch (error) {
        res.status(400).json(error)
   }
    
}

