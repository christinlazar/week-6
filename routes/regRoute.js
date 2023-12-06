const express = require('express')

const UserRoute = express();

// const app = express();

UserRoute.set('view engine','ejs')

const session = require('express-session')

const userController = require('../controllers/registrationController')

UserRoute.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:true
}))  
// const nocache = require('nocache')
const auth = require('../middleware/auth')
const authadmin = require('../middleware/adminauth')


// UserRoute.use(nocache())
UserRoute.get("/",auth.isLogin,authadmin.isLogin,userController.loadLogin)

UserRoute.post("/",userController.loginDetails)

UserRoute.get('/home',auth.isHome,userController.loadHome)

UserRoute.get('/register',userController.loadRegister)

UserRoute.post('/register',userController.userDetials)

UserRoute.get('/logout',userController.loadLogout)


module.exports = UserRoute; 