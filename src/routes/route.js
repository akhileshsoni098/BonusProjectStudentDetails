  
  
 const express = require("express");
 const router = express.Router();
const userController = require('../controllers/userController')
const studentController =require("../controllers/studentController")
 const auth = require("../auth")



router.post('/register',userController.resisterUser)
 router.get('/logIn',userController.logIn)

 router.post('/student/:userId' , auth.authentication ,studentController.studentData )
  router.get("/",(req,res)=>{

    res.send({data: "hii there i am Akhilesh Soni"})
  })


  module.exports = router