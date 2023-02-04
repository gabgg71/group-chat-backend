const { response} = require("express");
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/jwtConf");
const { urlGoogle,  getGoogleAccountFromCode} = require('../configuration/google-scope.js');
const {DataGit} = require('../configuration/github-scope.js');



const crearUsuario = async (req, res = response) => {
  try {
    const { email, password } = req.body;
    req.body.img = process.env.PREDEFINED
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "This user already exists",
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
      msg: "Please talk to the administrator",
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
      msg: "Please talk to the administrator"

    }
  }
};

const crearUsuarioGithub = async (data) => {
  try {
    let usuario = await Usuario.findOne({user: data.user});
    if (usuario) {
      const token = await generarJWT(usuario.id);
      return {
        ok: false,
        uid: usuario.id,
        user: usuario,
        token
      };
    }
    usuario = new Usuario(data);
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
      msg: "Please talk to the administrator"

    }
  }
};

const loginGoogle =async(email)=>{
  try {
    let usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return {
        ok: false,
        msg: "This user does not exists",
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
      msg: "Please talk to the administrator",
    };
  }

}

const loginGithub =async(user)=>{
  try {
    let usuario = await Usuario.findOne({ user});
    if (!usuario) {
      return {
        ok: false,
        msg: "Unregistered user",
      };
    }
    const token = await generarJWT(usuario._id);
    return {
      ok: true, 
      uid: usuario._id,
      user: usuario,
      token
    };
  } catch (error) {
    return {
      ok: false,
      msg: "Please talk to the administrator"
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
        msg: "This user does not exists",
      });
    }
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if(!validPassword){
      return res.status(400).json({
        ok: false,
        msg: 'Wrong password'
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
      msg: "Please talk to the administrator"
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
      resp:'Please talk to the administrator'
    })
  }
}



const confirmaExistenciaGit =async(req, res = response)=>{
  let {code, type}= req.query
  try {
    let datica = await DataGit(code)
    let resp = undefined;
    if(type === 'login'){
      resp = await loginGithub(datica.user);
    }else {
      resp = await crearUsuarioGithub(datica);
    }
    res.status(200).json({
      resp
    });
  } catch (error) {
    res.status(500).json({
      ok:false,
      resp:'Please talk to the administrator'
    })
  }
  
}

const dameUrl =(req, res = response)=>{
  let url = urlGoogle();
  res.json({
    url:url
  });
}




module.exports = { crearUsuario, loguearUsuario, dameUrl, confirmaExistencia, crearUsuarioGithub , confirmaExistenciaGit};
