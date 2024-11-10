const Role=require('../models/Role')

exports.addRole = async (req, res, next) => {
      const role = new Role({
        name:req.body.name
      })
      
      role.save()
        .then((role) => res.status(201).json(role))
        .catch(error => {res.status(400).json( error );
      console.log(error);
      })
  }
  
  exports.getRoles = async (req, res, next) => {
    Role.find({ name: { $ne: 'ADMIN' } })
      .then((roles) => res.status(200).json(roles))
      .catch((error) => res.status(400).json(error));
  };