const jwt = require("jsonwebtoken")


const authentication =  (req,res,next)=>{
    let token = req.headers['authorization']
    if(!token){return res.status(401).send({status:false , message:"authentication failed"})}

    token = token.split(" ")
    
jwt.verify(token[1],"iAmSecreateKey" , function(err,decoded){
    if(err){
        return res.status(401).send({status:false , message:err.message})
}else{
    req.userId =decoded.userId
} 
next()
})
}


const authorization = async (req,res,next)=>{
    const userId = req.params.UserId
    const verifyUser = req.UserId
let userData= await userModel.findById(userId)
if(!userData){return res.status(404).send({status:false, message:"user Not found"})}
if(userData != verifyUser){
    return res.status(403).send({status:false , message:"Unauthorized Access"})
}
next()
}



module.exports ={authentication ,authorization}