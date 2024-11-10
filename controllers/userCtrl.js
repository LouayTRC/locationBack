const User=require('../models/User')
const Reservation=require('../models/Reservation')
const Driver=require('../models/Driver')
const bcrypt=require('bcrypt')
const { populate } = require('../models/Role')

exports.addDriver=(req,res,next)=>{
    const user=new User({
        ...req.body.user
    })
    user.save()
    .then((u)=>{
        console.log("user",u);
        const driver=new Driver({
            user:u,
            region:req.body.region
        })
        driver.save()
        .then((d)=>res.status(201).json(d))
        .catch((error)=>res.status(400).json(error))
    })
    .catch((error)=>res.status(400).json(error))
}

exports.getDrivers=async (req,res,next)=>{
    
    try {
        const drivers=await Driver.find().populate({
            path:'user',
            populate:{
                path:'role'
            }
        });
        res.status(200).json(drivers)  
    } catch (error) {
        res.status(400).json(error)  
    }
}

exports.getUsers=async (req,res,next)=>{
    
    try {
        const users=await User.find().populate('role');
        res.status(200).json(users)  
    } catch (error) {
        res.status(400).json(error)  
    }
}

exports.createUser=(userData)=>{
    return bcrypt.hash(userData.password,10)
      .then(hash => {
          const user=new User({
              email:userData.email,
              name:userData.name,
              password:hash,
              phone:userData.phone,
              cin:userData.cin,
          })
          console.log(user);
          
          return user;
      })
  }

  exports.getAvailableDrivers = async (req, res) => {
    const { startDate, endDate } = req.body; // Assuming these are in 'YYYY-MM-DD' format
  
    try {
      // Convert the start and end date strings to Date objects
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      // 1. Find all reservations that conflict with the given dates and have an assigned driver
      const conflictingReservations = await Reservation.find({
        driver: { $ne: null },  // Only include reservations with an assigned driver
        $or: [
          {
            dateStart: { $lte: end },  // Reservation starts before or on the requested end date
            dateEnd: { $gte: start }   // Reservation ends after or on the requested start date
          }
        ]
      })
      .populate({
        path: 'driver',
        populate: { path: 'user', populate: { path: 'role' } }  // Populate driver.user and driver.user.role
      });
  
      // 2. Extract IDs of drivers with conflicting reservations
      const conflictingDriverIds = conflictingReservations
        .map(reservation => reservation.driver && reservation.driver._id.toString())
        .filter(id => id); // Ensure no undefined values are included
  
      // 3. Retrieve all drivers from the Driver collection
      const allDrivers = await Driver.find()
        .populate({ path: 'user', populate: { path: 'role' } }); // Populate driver details
  
      // 4. Filter out drivers who are in the conflicting reservations
      const availableDrivers = allDrivers.filter(driver => {
        return !conflictingDriverIds.includes(driver._id.toString());
      });
  
      // 5. Return the list of available drivers
      return res.status(200).json(availableDrivers);
    } catch (error) {
      console.error("Error fetching available drivers:", error);
      return res.status(500).json({ message: "Error fetching available drivers." });
    }
  };
  
  
  
  
  