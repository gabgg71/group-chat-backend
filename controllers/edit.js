const { response} = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");


const edit =async(req, res= response)=>{
    try {
        const {email, password} = req.body;
        if(password){
          const salt = bcrypt.genSaltSync();
          req.body.password = bcrypt.hashSync(password, salt);
        }
        const result = await Usuario.findOneAndUpdate({email}, req.body,{new: true});
        return res.status(200).json({
            ok: true,
            msg: 'Se actualizo la información correctamente',
            rs: result
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Please talk to the administrator'
        });
    }
}

//para cambio de pass 
const validaPass = async(req, res = response) => {
  const { email, password } = req.body;
    let usuario = await Usuario.findOne({ email });
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if(!validPassword){
      return res.json({
        correct: false
      })
    }
    return res.status(200).json({
      correct: true
    })
  }



module.exports={
    edit, 
    validaPass
}