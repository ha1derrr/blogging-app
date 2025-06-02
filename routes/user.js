const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/signup',(req,res)=>{
    res.render('signup')
})

router.get('/signin',(req,res)=>{
    res.render('signin')
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
    const token = await User.matchPasswordAndGenerateToken(email,password)
    console.log('Token', token)
    return res.render('home')
})


module.exports = router