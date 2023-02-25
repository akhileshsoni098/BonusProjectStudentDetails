  
  
 const express = require("express");
 const router = express.Router();
const userController = require('../controllers/userController')


 router.post('/register',userController.resisterUser)
 router.get('/logIn',userController.logIn)

 
  router.get("/",(req,res)=>{

    res.send({data: "hii there i am Akhilesh Soni"})
  })


  module.exports = router