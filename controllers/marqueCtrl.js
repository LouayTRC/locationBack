const Marque=require("../models/Marque")

exports.addMarque=(req,res,next)=>{
    const marque=new Marque(
        {name:req.body.name}
    )
    marque.save()
    .then((c)=>res.status(201).json(c))
    .catch(error=> res.status(400).json({error}))
}

exports.getMarques=(req,res,next)=>{
    Marque.find()
    .then((c)=>res.status(200).json(c))
    .catch(error=> res.status(400).json({error}))
}