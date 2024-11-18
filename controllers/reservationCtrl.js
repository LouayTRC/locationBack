const Reservation = require('../models/Reservation')
const Car = require('../models/Car')
const Client = require('../models/Client')
const Location = require('../models/Location')
const dayjs = require('dayjs')
const Driver = require('../models/Driver')
const User = require('../models/User')

exports.addReservation = async (req, res, next) => {
    console.log("ddd", req.body);

    const localLocation = new Location(36.851256, 10.211287);
    const priceByKm = 10;
    var somme = 0;
    var distanceEnKm = 0;
    const car = await Car.findOne({ _id: req.body.carId }).populate('category').populate('marque');
    
    if (car.status == 1) {
        console.log("ddd");

        var driver = null;
        const { dateStart, dateEnd } = req.body;
        const startDate = dayjs(dateStart);
        const endDate = dayjs(dateEnd);

        const diffInDays = endDate.diff(startDate, 'day');
        console.log("Difference in days:", diffInDays);
        somme += car.price * diffInDays;

        if (req.body.location) {
            distanceEnKm = localLocation.distanceTo(req.body.location);
            console.log("distance en km :", distanceEnKm);
            somme += distanceEnKm * priceByKm;
        }

        if (req.body.driver) {
            const user = await User.findOne({ _id: req.body.driver });
            driver = await Driver.findOne({ user: user });
            somme += driver.priceByDay * diffInDays;
        }

        console.log("userId", req.body.user);
        const user = await User.findOne({ _id: req.body.user });
        console.log("usss", user);

        const client = await Client.findOne({ user: user }).populate({
            path: 'user',
            populate: {
                path: 'role',
            }
        });

        const reservation = new Reservation({
            car,
            client,
            distanceEnKm: distanceEnKm.toFixed(3),
            driver: driver,
            dateStart: startDate,
            dateEnd: endDate,
            status: 0,
            diffDays: diffInDays,
            total: somme.toFixed(3)
        });

        if (req.body.location) {
            reservation.locationLong = req.body.location.longitude;
            reservation.locationLat = req.body.location.latitude;
        } else {
            reservation.latitude = null;
            reservation.longitude = null;
        }

        reservation.save()
            .then(async (r) => {
                console.log("r", r);

                // If driver is present, add the reservation to the driver's reservation array
                if (req.body.driver) {
                    console.log("driver", driver);
                    driver.reservations.push(r);

                    // Save the driver with the updated reservations array
                    await driver.save();
                }

                // Populate the reservation after saving it
                const populatedReservation = await Reservation.findById(r._id)
                    .populate({
                        path: 'client',
                        populate: {
                            path: 'user',
                            populate: {
                                path: 'role',
                            },
                        },
                    })
                    .populate({
                        path: 'driver',
                        populate: {
                            path: 'user',
                            populate: {
                                path: 'role',
                            },
                        },
                    })
                    .populate({
                        path: 'car',
                        populate: [
                            { path: 'category' },
                            { path: 'marque' },
                        ],
                    });

                // Return the populated reservation
                res.status(201).json(populatedReservation);
            })
            .catch(error => res.status(400).json(error));
    } else {
        res.status(400).json({ error: "Car is not available" });
    }
};


exports.getReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find()
            .populate({
                path: 'client',
                populate: {
                    path: 'user',
                    populate: {
                        path: 'role'
                    }
                }
            })
            .populate({
                path: 'driver',
                populate: {
                    path: 'user',
                    populate: {
                        path: 'role'
                    }
                }
            })
            .populate({
                path: 'car',
                populate: [
                    { path: 'category' },
                    { path: 'marque' }
                ]
            });

        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getReservationById = async (req, res, next) => {
    try {


        const reservation = await Reservation.findOne({ _id: req.params.id })
            .populate({
                path: 'client',
                populate: {
                    path: 'user',
                    populate: {
                        path: 'role'
                    }
                }
            })
            .populate({
                path: 'driver',
                populate: {
                    path: 'user',
                    populate: {
                        path: 'role'
                    }
                }
            })
            .populate({
                path: 'car',
                populate: [
                    { path: 'category' },
                    { path: 'marque' }
                ]
            });

        console.log("ressss", reservation);

        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateReservationStatus = (req, res, next) => {
    Reservation.updateOne({ _id: req.params.id }, { status: req.params.status, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Status Modifié' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getReservationByUserId = async (req, res, next) => {
    try {

        const user = await User.findOne({ _id: req.params.id }).populate('role');

        if (user.role.name == "CLIENT") {
            const client = await Client.findOne({ user: user._id })

            const reservations = await Reservation.find({ client: client })
                .populate({
                    path: 'client',
                    populate: {
                        path: 'user',
                        populate: {
                            path: 'role'
                        }
                    }
                })
                .populate({
                    path: 'driver',
                    populate: {
                        path: 'user',
                        populate: {
                            path: "role"
                        }
                    }
                })
                .populate({
                    path: 'car',
                    populate: [
                        { path: 'category' },
                        { path: 'marque' }
                    ]
                });
            res.status(200).json(reservations);
        }
        else {
            const driver = await Driver.findOne({ user: user._id })

            const reservations = await Reservation.find({ driver: driver })
                .populate({
                    path: 'client',
                    populate: {
                        path: 'user',
                        populate: {
                            path: "role"
                        }
                    }
                })
                .populate({
                    path: 'driver',
                    populate: {
                        path: 'user',
                        populate: {
                            path: "role"
                        }
                    }
                })
                .populate({
                    path: 'car',
                    populate: [
                        { path: 'category' },
                        { path: 'marque' }
                    ]
                });


            res.status(200).json(reservations);
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};