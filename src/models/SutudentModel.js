const mongoose = require("mongoose")


const studentSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
subject:{
    type:String,
    required:true
},
marks:{
    type:Number,
    required:true,
    default:0

},

userId:{
    type: mongoose.Schema.Types.ObjectId,
   ref:"Nuser"
},

isDeleted:{
    type:Boolean,
    default:false
}

}, {timestamp:true})

module.exports = mongoose.model("student", studentSchema)