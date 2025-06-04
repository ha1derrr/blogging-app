const express = require('express')
const ejs = require('ejs')
const dotenv = require('dotenv')
const path = require('path')
const router = require('./routes/user')
const {connect} = require('mongoose')
const { checkForAuthenticationCookie } = require('./middlewares/auth')
const cookieParser = require('cookie-parser')
const blogRouter = require('./routes/blog')
const Blog = require('./models/blog')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()

app.set("view engine", "ejs")
app.set("views", path.resolve('./views'))
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(checkForAuthenticationCookie('token'))
app.use(express.static(path.resolve('./public')))

connect('mongodb://127.0.0.1:27017/blogDB')
.then(()=>{
    console.log('Database Connected')
})
.catch((error)=>{
    console.log('Error')
})

app.get('/',async(req,res)=>{
    const allBlogs = await Blog.find({})
    res.render('home',{
        blogs:allBlogs,
        user:req.user
    })
})

app.use('/user',router)
app.use('/blog',blogRouter)

app.listen(PORT,()=>{
    console.log(`Server running at PORT${PORT}`)
})