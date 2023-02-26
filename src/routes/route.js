  
  
 const express = require("express");
 const router = express.Router();
const userController = require('../controllers/userController')
const studentController =require("../controllers/studentController")
 const auth = require("../auth")



router.post('/register',userController.resisterUser)
 router.get('/logIn',userController.logIn)
 router.get('/student/:userId',auth.authentication, userController.getDataFilter)

 router.put('/student/:userId',auth.authentication,auth.authorization, userController.updateStudent)
 router.delete('/student/:userId',auth.authentication,auth.authorization, userController.deleteData)
// student api
 router.post('/student/:userId' , auth.authentication ,studentController.studentData )


  module.exports = router
    