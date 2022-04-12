const { response} = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");


const edit =async(req, res= response)=>{
    console.log('Me llamaste edit');
    try {
        const {email} = req.body;
        let usuario = await Usuario.findOne({email});
        if(!usuario){
            res.status(400).json({
                ok: false,
                msg: 'no existe ese usuario'
            });
        }
        const validPassword = bcrypt.compareSync(req.body.password, usuario.password);
        if(!validPassword){
            const salt = bcrypt.genSaltSync();
            req.body.password = bcrypt.hashSync(req.body.password, salt);
        }else{
            req.body.password = usuario.password;
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
            msg: 'Error, comuniquese con el admin'
        });
    }
}



module.exports={
    edit
}