

const express = require('express')

const adminroute = express()

const session = require('express-session')

const bodyParser = require('body-parser')
 adminroute.use(bodyParser.json())
 adminroute.use(bodyParser.urlencoded({extended:true}))

 adminroute.set('view engine','ejs')
 adminroute.set('views','./views/admin')

 const adminContoller = require('../controllers/admincontroller')

// const { isLogout } = require('../middleware/auth')

const auth = require('../middleware/adminauth')

 adminroute.use(session({
    secret:"12345",
    resave:false,
    saveUninitialized:true
}))



//  adminroute.get('/',adminContoller.loadAdminLogin)

// adminroute.post('/',adminContoller.verifyLogin)


adminroute.get('/home',auth.isAdminhome,adminContoller.loadHome)

adminroute.get('/logout',auth.isAdminhome,adminContoller.logOut)

adminroute.get('/newuser',auth.isAdminhome,adminContoller.newUser)
adminroute.post('/newuser',auth.isAdminhome,adminContoller.addUser)

adminroute.get('/useredit',auth.isAdminhome,adminContoller.editUser)


adminroute.post('/useredit',auth.isAdminhome,adminContoller.verifyUpdate)

adminroute.get('/userdelete',auth.isAdminhome,adminContoller.deleteUser)

adminroute.post('/home/search',auth.isAdminhome,adminContoller.search)



 adminroute.get('*',function(req,res){
    res.redirect('/admin/home')
 })

 module.exports = adminroute

