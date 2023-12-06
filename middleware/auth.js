

const isLogin =  async(req,res,next)=>{
    try {
        console.log("hi")
        if(req.session.user){    
            res.redirect('/home')
        }else{
            next()
        }
    } catch (error) {
        console.log(error.message)
    }
}
const isHome =  async(req,res,next)=>{
    try {
        if(req.session.user){
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
    isHome
}
