const Reservation=require('../models/Reservation')
const Car=require('../models/Car')
const User=require('../models/User')
const Client=require('../models/Client')
const Location=require('../models/Location')
const dayjs=require('dayjs')

exports.addReservation = async (req, res, next) => {
    const localLocation=new Location(36.851256, 10.211287)
    const driverPriceByDay=50;
    const priceByKm=2;
    var somme=0;
    const car=await Car.findOne({_id:req.body.carId})
    console.log(car);
    
    if(car.status==1){
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

        const user=new User({
            ...req.body.user
        })
        user.save()
        .then((u)=>{
            const client=new Client({
                user:u
            })
            client.save()
            .then(async (c)=>{
                const savedCar=await Car.findOne({_id:c._id}).populate('category').populate('marque')
                const reservation=new Reservation({
                    car:savedCar,
                    client:c,
                    locationLong:req.body.location.longitude,
                    locationLat:req.body.location.latitude,
                    driver:driver,
                    dateStart:startDate,
                    dateEnd:endDate,
                    status:0,
                    total:somme.toFixed(3)
                })
        
                reservation.save()
                .then((r)=>{
                    console.log("dd",r);
                    res.status(201).json((r))
                })
                .catch(error=>res.status(400).json(error))
            })
            .catch(error=>res.status(401).json(error))
        })
        .catch(error=>res.status(402).json(error))



        
        

    }
    
};
exports.getReservations=async (req,res,next)=>{
   try {
        const reservations=await Reservation.find()
        res.status(200).json(reservations)
   } catch (error) {
        res.status(400).json(error)
   }
    
}

