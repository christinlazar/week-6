const User = require('../models/RegistrationModel')

// login
const loadLogin = async(req,res)=>{
 console.log("calling login");
    try{

      res.render('login.ejs')

    }catch(error){
        console.log(error.message)
    }
}
const loginDetails = async(req,res)=>{
    try{ 
 const email=req.body.email
 const pwd = req.body.password
  const data = await User.findOne({email:email,password:pwd})
  if(data){
    if(data.is_admin === 1)
    {
        if(pwd===data.password){
            req.session.admin=data._id
            res.redirect('/admin/home')
        }else{
            res.render('login',{message:"password is incorrect"})
        }
      }
      else if(data.is_admin === 0)
      {
        if(pwd===data.password){
            req.session.user=data._id
            res.redirect('/home')
        }else{
            res.render('login',{message:"password is incorrect"})
        }
      }   
  }else{
    res.render("login",{message:"password and email dosen't matches"})
  }
    }catch(error){
        console.log(error.message)
    }
} 
const loadRegister = async(req,res)=>{

try {
   
    res.render('registration')


} catch (error) {

    console.log(error.message)

}
}
const userDetials = async(req,res)=>{

try{
const newUser = {
    name:req.body.name,
    email:req.body.email,
    mobile:req.body.mobile,
    password:req.body.password
}

const userdata = await User.create(newUser)
res.render("registration",{message:`Mr ${userdata.name} registered succesfully`})

}catch(error){
  console.log(error.message)
}
} 

const loadHome = async(req,res)=>{

try{
  const userData = await User.findById({_id:req.session.user})
    res.render('home.ejs',{message:userData.name})
    
}catch(err){
    console.log(err.message)
}
}

const loadLogout = async(req,res)=>{

    try{
        req.session.destroy()
        res.redirect('/')

    }catch(error){
    console.log(error.message)
    }
}

module.exports={
    loadRegister,
    userDetials,
    loadLogin,
    loginDetails,
    loadHome,
    loadLogout
}