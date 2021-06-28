const jwt = require('jsonwebtoken')

exports.auth = (req,res,next) => {
    const reqHeader = req.header('x-auth-token')
    if(!reqHeader){
    return res.status(404)
    }
    try{
       const decodedToken = jwt.verify(reqHeader,"secret")
       req.tokenData = decodedToken
       next()
    }catch(e){
        // console.log(e);
        console.log("from here");
        res.status(401).json({err:"token invalid or expired"});
    }

}