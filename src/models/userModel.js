
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

userName:{
type: String,
required: true,
unique: true
},
password:{
    type:String,
    required:true,
}


}, {timestamp:true})

module.exports = mongoose.model("Nuser",userSchema)
