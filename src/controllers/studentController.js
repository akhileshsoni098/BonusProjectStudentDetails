const studentModel = require("../models/SutudentModel")




const studentData = async (req ,res)=>{
    let userId= req.params.userId
    let data = req.body
    let {name,subject,marks} = data
let nameExist = await studentModel.find({name:name})
let subjectExist = await studentModel.find({subject:subject})
 if(nameExist.name == name && subjectExist.subject == subject){
    let updateMarks = await studentModel.findOneAndUpdate({name:nameExist.name,subject:subjectExist.subject},
         {$set:{marks:marks}},{new:true})
    return res.status(200).send({status:false , data:updateMarks})
 } else{

data.userId = userId

let saveStudent = await studentModel.create(data)
res.status(201).send({status:false , data:saveStudent})

 }
}

module.exports = {studentData}