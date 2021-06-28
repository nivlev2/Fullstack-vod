const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    favorites:Array
})

exports.UserModel = mongoose.model('users',userSchema)

exports.validateUser = (user)=>{
    const schema = Joi.object({
        name:Joi.string().min(2).max(99).required(),
        email:Joi.string().min(2).max(99).required(),
        password:Joi.string().min(5).max(99).required(),
        favorites:Joi.array()
    })
    return schema.validate(user)
}

exports.getToken = (userId)=>{
    return jwt.sign({_id:userId},"secret",{expiresIn:"60min"})
}

exports.userFavorites = (dataBody)=>{
    const schema = Joi.object({
        favorites:Joi.array().min(1).required()
    })
   return schema.validate(dataBody)
}