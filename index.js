const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const path = require('path')
const router = require('./routes/user')
const {connect} = require('mongoose')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))

connect('mongodb://127.0.0.1:27017/blogDB')
.then(()=>{
    console.log('Database Connected')
})
.catch((error)=>{
    console.log('Error')
})
app.use(express.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.render('home')
})

app.use('/user',router)

app.listen(PORT,()=>{
    console.log(`Server running at PORT${PORT}`)
})