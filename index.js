
const mongoose = require('mongoose')
// mongoose.connect("mongodb://127.0.0.1:27017/regdetials")
const nocache = require('nocache')
const express = require('express')
const app =express();
mongoose.set("strictQuery", true);
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/regdetials");
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log(error,'ererrr');
    process.exit(1);
  }
};

 connectDB()


app.use(express.urlencoded({extended:true}))
const usersRoute = require('./routes/regRoute')

const adminRoute = require('./routes/adminRoute')
// app.set("view engine","ejs")

app.use(nocache())

app.use('/',usersRoute)
app.use('/admin',adminRoute)
app.listen(2000,()=>{
    console.log("server started running")
})
