
const userModel = require("../models/userModel")
const studentModel = require("../models/SutudentModel")
const jwt = require("jsonwebtoken")

const resisterUser = async (req,res)=>{

    const data = req.body
    const {userName, password} =req.body

    if(!userName){return res.status(400).send({status:false , message:"user name is mandatory"})}

    if(!password){return res.status(400).send({status:false , message:"user password is mandatory"})}
    
let userExist = await userModel.findOne({userName:userName})
if(userExist){return res.status(400).send({status:false, message:"user already Exist"})}

const userCreate = await userModel.create(data)
res.status(200).send({status:true , data:userCreate})

}

const logIn = async (req,res)=>{
const data = req.body
const {userName, password} =req.body

const checkUser = await userModel.findOne({userName:userName})
if(!checkUser){return res.status(400).send({status:false, message:"Please Resister yourself"})}
if(password != checkUser.password){return res.status(400).send({status:false , message:"Incorrect password"})}

let token = jwt.sign({userId:checkUser._id}, "iAmSecreateKey")

res.setHeader('Authorization', `Bearer ${token}`)

let studentData = await studentModel.find()

res.status(200).send({status:true ,message:"successfully LogIn" , data:studentData})

}


module.exports = {resisterUser,logIn} 