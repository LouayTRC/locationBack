const User = require('../models/User');
const Client = require('../models/Client');
const Driver = require('../models/Driver');
const userCtrl = require('../controllers/userCtrl');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Role = require('../models/Role')
const Admin = require('../models/Admin')



exports.login = (req, res, next) => {
    console.log("req", req.body);

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ message: "login/mdp incorrect" });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(async valid => {
                    if (!valid) {
                        return res.status(401).json({ message: "login/mdp incorrect" });
                    }
                    else {
                        if (user.status != 1) {
                            return res.status(401).json({ message: "your profile isn't activated " });
                        } else {
                            await user.populate('role')
                            console.log("user login", user);

                            return res.status(200).json({
                                user,
                                token: jwt.sign(
                                    {
                                        user_id: user._id,
                                        user_Role: user.role
                                    },
                                    'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj',
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    }
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

exports.driverSignup = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const role = await Role.findOne({ name: "DRIVER" })

            const user = await userCtrl.createUser(req.body.user)
            user.role = role
            user.status = 0
            await user.save()
            const driver = new Driver({
                user,
                region: req.body.region,
                priceByDay: req.body.priceByDay,
                genre:req.body.genre
            })
            driver.save()
                .then((driver) => {
                    console.log("driver", driver);

                    res.status(201).json(driver)
                })
                .catch(error => res.status(400).json({ error }))
    } catch (error) {
        res.status(400).json({ error })
    }

}

exports.clientSignup = async (req, res, next) => {
    try {
        console.log(req.body);
        
        const role = await Role.findOne({ name: "CLIENT" })

        
            const user = await userCtrl.createUser(req.body.user)
            user.role = role
            user.status = 1
            await user.save()
            const client = new Client({
                user
            })
            client.save()
                .then((client) => {
                    console.log("client", client);
                    res.status(201).json(client)
                })
                .catch(error => res.status(400).json({ error }))
        
    } catch (error) {
        res.status(400).json({ error })
    }

}

exports.verifyToken = (req, res, next) => {
    const token = req.body.token;
    if (token) {
        const decode = jwt.verify(token, 'f1sd3f12dsg1d65fs165f1ds6g1re6f1sq6f1sd65f1sd65srt1rs53fzeyehyutyj');
        console.log("decode", decode);
        res.status(200).json({
            login: true,
            data: decode
        });
    } else {
        res.status(400).json({
            login: false,
            data: 'error'
        });
    }
}

exports.addAdmin = async (req, res, next) => {
    const role = await Role.findOne({ name: "ADMIN" })
    const user = await userCtrl.createUser(req.body)
    user.role = role
    user.status = 1
    await user.save()
    const admin = new Admin({
        user
    })
    admin.save()
    .then((a) => {
        console.log("admin", a);
        res.status(201).json(a)
    })
    .catch(error => res.status(400).json({ error }))
}