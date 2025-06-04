const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.get('/signin',(req,res)=>{
    res.render('signin')
})

router.get('/logout',(req,res)=>{
    return res.clearCookie('token').redirect('/')
})

router.post('/signup',async(req,res)=>{
    const {name, email, password} = req.body
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/')
})

router.post('/signin',async (req, res)=>{
    const {email, password} = req.body
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password)
        return res.cookie("token", token).redirect('/')
    }catch(error){
        return res.render('signin',{
            error: 'Incorrect Email or Password'
        })
    }
})

module.exports = router