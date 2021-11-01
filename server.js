const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.nr8aa.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}`

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// Use .env files in local setup
!process.env.NODE_ENV ? require('dotenv').config() : console.log('DEV:PROD')

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type')
    next()
})
//MongoSession
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
})
//IMPORTING
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const urlRouter = require('./routes/url')
const dashboardRouter = require('./routes/dashboard')
//ROUTES
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/home', urlRouter)
app.use('/dashboard', dashboardRouter)
app.use(
    session({
        secret: 'url-cutter',
        resave: false,
        saveUninitialized: false,
        store: store
    })
)
app.use((req, res, next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user 
        next()
    })
    .catch(err => console.log(err))
})

mongoose.connect(MONGODB_URI).then(result=>{
    console.log('🚀 Connected')
    app.listen(process.env.PORT || 3000)
})
.catch(err => {
    console.log(err)
})
