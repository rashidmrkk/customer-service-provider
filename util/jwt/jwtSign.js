const jwt = require('jsonwebtoken');
exports.jwtSign=async(data)=>{
    // return(jwt.sign(data,process.env.JWT_SECRET_KEY))
    return(jwt.sign(data,"pijhghghvghcfrytdvnmnjgtdxfhbhkmkjffgn"))

} 