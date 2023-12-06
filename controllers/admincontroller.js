
const User = require('../models/RegistrationModel')

const randomString = require('randomstring')

// const loadAdminLogin = async (req,res)=>{

//     try{
     
//         res.render('login')

//     }catch(error){
//         console.log(error.message)
//     }

// } 

const verifyLogin = async (req,res)=>{
    try {
        
       const email = req.body.email
       const password = req.body.password

      const userData=  await  User.findOne({email:email})

      if(userData){

        if(password===userData.password){

            if(userData.is_admin===1){
                req.session.admin=userData._id
                res.redirect('/admin/home')
            }else{
                res.render('login',{message:"oops you are not allowed!!"})
            }
        }else{
            res.render('login',{message:"oops you are not allowed!!"}) 
        }
      }else{

       res.render('login',{message:"oops you are not allowed!!"})

      }
    } catch (error) {
        console.log(error.message)
    }
}

const loadHome = async(req,res)=>{

    try{
           const userData = await User.find({is_admin:0})
            res.render('home',{users:userData})

    }catch(error){
        
        console.log(error.message)

    }
}

const logOut = async(req,res)=>{

    try {
         req.session.destroy()
        res.redirect('/')

    } catch (error) {
        console.log(error.message)
    }

}

const newUser = async(req,res)=>{
    try {
        res.render('newuser')
    } catch (error) {
        console.log(error.message)
    }
}

const addUser = async(req,res)=>{
    try{

       const name=req.body.name
       const email=req.body.email
       const  mobile=req.body.mobile
       const password= randomString.generate(8)
        

       const newuser = new User({
            name:name,
            email:email,
            mobile:mobile,
            password:password
        })

        const userData = await newuser.save() 

            if(userData){

                res.redirect('/admin/home')

            }else{

                res.render('newuser'({error:"something went wrong"}))

            }

    }catch(error){
        console.log(error.message)
    }
}

const editUser = async(req,res)=>{

    try{
          
        const id = req.query.id
        const userData = await User.findById({_id:id})
            if(userData){
                res.render('edituser',{user:userData})
            }else{
                res.redirect('/admin/home')
            }
    }catch(error){

        console.log(error.message)

    }
}

const verifyUpdate = async(req,res)=>{
    try{
console.log(req.body.id)
    
       const updateData = await  User.findByIdAndUpdate({_id:req.query.id},{$set:{name:req.body.name,email:req.body.email,mobile:req.body.mobile}});
      
        res.redirect('/admin/home')
    }catch(error){
        console.log(error.message)

    }
}

const deleteUser = async(req,res)=>{
    
    try{
const id = req.query.id
const deletedData = await User.deleteOne({_id:id})
res.redirect('/admin/home')
    }catch(error){

        console.log(error.message)
    }

}

const search = async(req,res)=>{

    try {
        
        const search = req.body.search
        const searchResult = await User.find({$and:[{name:{$regex: new RegExp(search, 'i' )}},{is_admin:0}]})
        if(searchResult){
            res.render('home',{users:searchResult})
        }

    } catch (error) {
        console.log(error.message)
        
    }
}


module.exports = {
    verifyLogin,
    loadHome,
    logOut,
    newUser,
    addUser,
    editUser,
    verifyUpdate,
    deleteUser,
    search
}