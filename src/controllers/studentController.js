const studentModel = require("../models/SutudentModel")




const studentData = async (req ,res)=>{
    try{
    let userId= req.params.userId
    let data = req.body
    let {name,subject,marks} = data

    data.userId = userId

    if(!name){return res.status(400).send({status:false , message:"Name field is mandatary"})}
    if(!subject){return res.status(400).send({status:false , message:"subject is mandatary"})}
    if(!marks){return res.status(400).send({status:false , message:"marks is mandatary"})}
let nameExist = await studentModel.findOne({name:data.name})
if(nameExist){return res.status(400).send({status:false , message:"student already exist"})}
let saveStudent = await studentModel.create(data)
res.status(201).send({status:false , data:saveStudent})

}catch(err){
    res.status(500).send({status:false , message:err.message})
}
}



module.exports = {studentData}