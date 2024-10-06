const Category=require("../models/Category")

exports.addcategory=(req,res,next)=>{
    const category=new Category(
        {name:req.body.name}
    )
    category.save()
    .then((c)=>res.status(201).json(c))
    .catch(error=> res.status(400).json({error}))
}

exports.getcategorys=(req,res,next)=>{
    Category.find()
    .then((c)=>res.status(200).json(c))
    .catch(error=> res.status(400).json({error}))
}