const studentModel = require("../models/SutudentModel")




const studentData = async (req ,res)=>{
    try{
    let userId= req.params.userId
    let data = req.body
    let {name,subject,marks} = data
    if(!name){return res.status(400).send({status:false , message:"Name field is mandatary"})}
    if(!subject){return res.status(400).send({status:false , message:"subject is mandatary"})}
    if(!marks){return res.status(400).send({status:false , message:"marks is mandatary"})}
let nameExist = await studentModel.find({name:name})
let subjectExist = await studentModel.find({subject:subject})
if(userId != nameExist.userId){
 if(nameExist.name == name && subjectExist.subject == subject){
    let updateMarks = await studentModel.findOneAndUpdate({name:nameExist.name,subject:subjectExist.subject},
         {$set:{marks:marks}},{new:true})
    return res.status(200).send({status:false , data:updateMarks})
 }
 } else{
data.userId = userId
let saveStudent = await studentModel.create(data)
res.status(201).send({status:false , data:saveStudent})
 }
}catch(err){
    res.status(500).send({status:false , message:err.message})
}
}

module.exports = {studentData}