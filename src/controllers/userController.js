
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

let token = jwt.sign({userId:checkUser._id}, "secreateKey")

// res.setHeader('Authorization', `Bearer ${token}`)

let studentData = await studentModel.find()

res.status(200).send({status:true ,message:token , data:studentData})

}

const getDataFilter = async (req, res)=>{
let data = req.body
let {name, subject} = req.body

if(name){
    let getDetails = await studentModel.find({name:name})
    if(getDetails.length==0){return res.status(400).send({status:false , message:"this name is not exist"})}
    res.status(200).send({status:false , message:getDetails})
}

if(subject){
    let getDeta = await studentModel.find({subject:subject})
    if(getDeta.length==0){return res.status(400).send({status:false , message:"this subject is not exist"})}
    res.status(200).send({status:false , message:getDeta})
}

// if(subject && name){
//     let getDetaBoth = await studentModel.find({subject:subject, name:name})
//     if(getDetaBoth.length==0){return res.status(400).send({status:false , message:"name or subject is not exist"})}
//     res.status(200).send({status:false , message:getDetaBoth})
// }
}


const updateStudent = async (req,res)=>{
 
let userId = req.params.userId
let data = req.body
let {name , subject, marks}= data

let nameExist = await studentModel.find({name:name})
let subjectExist = await studentModel.find({subject:subject})
 if(nameExist.name == name && subjectExist.subject == subject){
    let updateMarks = await studentModel.findOneAndUpdate({name:nameExist.name,subject:subjectExist.subject, isdeleted:false},
         {$set:{marks:marks}},{new:true})
    return res.status(200).send({status:false , data:updateMarks})
 } else{

res.status(400).send({status:false , message:"Invalid entry"})

}
}

let deleteData = async (req, res )=>{
    let data = req.body
    let userId = req.params.userId

    let {name, subject} = data

    let deleteData = await studentModel.findOneAndUpdate({name:name , subject:subject, isDeleted:false},
       {$set: {isDeleted:true}})
res.status(204).send({status:false , Message:"deleted successfully"})
}


module.exports = {resisterUser,logIn, getDataFilter, updateStudent, } 