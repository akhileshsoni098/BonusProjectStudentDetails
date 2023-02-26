const jwt = require("jsonwebtoken")


const authentication =  (req,res,next)=>{
    try {
        let token = req.headers['authorization']

        if(!token){
            return res.status(400).send({status: false, message: "Token not present"})
        }

        token = token.split(" ")

        console.log(token[1])

        jwt.verify(token[1],'secreateKey',function(err, decoded){
            if(err) return res.status(401).send({status: false, message: err.message}) 
            
           else {
            req.userId = decoded.userId
            next()
        }
        })             
    } catch (error) {
       return res.status(500).send({status: false, message: error.message})
    }
}


const authorization = async (req,res,next)=>{
    const userId = req.params.userId
    const verifyUser = req.userId
let userData= await userModel.findById(userId)
if(!userData){return res.status(404).send({status:false, message:"user Not found"})}
if(userData != verifyUser){
    return res.status(403).send({status:false , message:"Unauthorized Access"})
}
next()
}



module.exports ={authentication ,authorization}