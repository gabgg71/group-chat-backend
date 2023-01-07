const { response} = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwtConf");
const { urlGoogle,  getGoogleAccountFromCode} = require('../configuration/google-scope.js');


const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    req.body.img = process.env.PREDEFINED
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya existe",
      });
    }
    usuario = new Usuario(req.body);
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    await usuario.save();
    const token = await generarJWT(usuario.id);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};

const crearUsuarioGoogle = async ({id, email, name, img}) => {
  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      const token = await generarJWT(usuario.id);
      return {
        ok: false,
        uid: usuario.id,
        user: usuario,
        token
      };
    }
    usuario = new Usuario({id, email, name, img});
    await usuario.save();
    const token = await generarJWT(usuario.id);
    return {
      ok: true,
      uid: usuario.id,
      user: usuario,
      token
    }
  } catch (error) {
    return {
      ok: false,
      msg: "Por favor hable con el administrador"

    }
  }
};

const loginGoogle =async(email)=>{
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return {
        ok: false,
        msg: "El usuario no existe con ese email ",
      };
    }
    const token = await generarJWT(usuario.id);
    return {
      ok: true, 
      uid: usuario.id,
      user: usuario,
      token
    };
  } catch (error) {
    return {
      ok: false,
      msg: "Por favor hable con el administrador",
    };
  }

}

const loguearUsuario = async(req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario no existe con ese email ",
      });
    }
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true, 
      uid: usuario.id,
      user: usuario,
      token
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Por favor hable con el administrador",
    });
  }
};


const confirmaExistencia =async(req, res = response)=>{
  let {code, type }= req.body;
  try {
    let data = await getGoogleAccountFromCode(code, type);
    let resp = undefined;
    if(type === 'login'){
      resp = await loginGoogle(data.email);
    }else {
      resp = await crearUsuarioGoogle(data);
    }
    res.status(200).json({
      ok:true,
      resp
    });
  } catch (error) {
    res.status(500).json({
      ok:false,
      resp:'Error, comuniquese con el administrador'
    })
  }
}

const dameUrl =(req, res = response)=>{
  let url = urlGoogle();
  res.json({
    url:url
  });
}




module.exports = { crearUsuario, loguearUsuario, dameUrl, confirmaExistencia };
