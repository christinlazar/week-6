
const isLogin = async(req,res,next)=>{

        try {
            if(req.session.admin){
  res.redirect('/admin/home')
              
            }
            else{
            next()
            }
        } catch (error) {
            console.log(error.message)
        }
}

const isAdminhome = async(req,res,next)=>{
    try {
        if(req.session.admin){
         next()

        }else{  
        res.redirect('/')
        }
      
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    isLogin,
    isAdminhome
}


