const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const {auth} = require('../middlewares/auth')
const {UserModel,validateUser,getToken,userFavorites} = require('../models/userModel')

router.post('/',async (req, res) =>{
    const user = validateUser(req.body)
    if(user.error){
        return res.status(200).json(user.error.details)
    }

    try{

    const newUser = UserModel(req.body)
    newUser.password = await bcrypt.hash(newUser.password,10)
    await newUser.save()
    res.json(newUser)

    }catch(e){
        if(e.keyPattern.email){
            return res.status(200).json({msg:"email already exist"})
        }
        return res.status(404).json(e)
    }
})

router.post('/login',async (req, res) =>{
    try{
        const user = await UserModel.findOne({email: req.body.email})
        if(!user){
            return res.json({msg:"invalid email or password"})
        }
        const validPass = await bcrypt.compare(req.body.password,user.password)
        if(!validPass){
            return res.json({msg:"invalid email or password"})
        }
        const token = await getToken(user._id)
        return res.json({Token:token})

    }catch(e){
        return res.status(404).json(e)
    }
})

router.get('/userFavs',auth, async (req, res)=>{
    try{
        const user = await UserModel.findOne({_id:req.tokenData._id})
        if(!user){
            return res.json({msg:"token invalid or expired"})
        }
        res.json(user.favorites)
    }catch(e){
        return res.status(400).json(e)
    }
})

router.put('/favorites',auth,async (req, res)=>{
    const userFavs = userFavorites(req.body)
    if(userFavs.error){
        return res.status(404).json(userFavs.error.details)
    }
    try{
        const checkFavorite = await UserModel.find({_id:req.tokenData._id})
        const checker = checkFavorite[0].favorites.find(item => item.imdbID === req.body.favorites[0].imdbID)
        if(checker){
            return
        }
        const user = await UserModel.updateOne({_id:req.tokenData._id},{$push:req.body})
        if(!user){
            return res.status(404).json({msg:"token ivalid or expired"})
        }
        res.json(user) 
    }catch(e){
        return res.status(404).json(e)
    }
})
router.put('/removeFav',auth,async (req, res)=>{
    try{
        const user = await UserModel.updateOne({_id:req.tokenData._id},{$pull:req.body})
        if(!user){
            return res.status(404).json({msg:"token ivalid or expired"})
        }
        res.json(user) 
    }catch(e){
        return res.status(404).json(e)
    }

})
module.exports = router