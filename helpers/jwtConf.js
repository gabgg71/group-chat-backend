const jwt = require('jsonwebtoken');

//Generar token
const generarJWT=(uid,name)=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid, name};
        jwt.sign(payload, process.env.SECRET_JWT,{
            expiresIn: '2h'
        }, (err, token)=>{
            if(err){
                reject('No es posible generar el token'); 
            }
            resolve(token); 
        })
    })

}

module.exports ={
    generarJWT
}