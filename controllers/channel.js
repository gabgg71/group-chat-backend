const { response} = require("express");
const Canal = require("../models/Canal");
const Usuario= require("../models/Usuario");

const dvChannels = async (req, res = response) => {
    try {
        let canal = await Canal.find();
        return res.json({
            channels: canal
        })
    } catch (error) {
        
    }
}

const agregarCanal = async (req, res = response) => {
  try {
    let {user, channel} = req.body;
    let usuario = await Usuario.findById(user);
    let canal = await Canal.findById(channel);
    if (!usuario) {
      res.json({
        ok: false,
        msg:"The user does not exist",
      });
    }
    if(!canal){
      res.json({
        ok: false,
        msg:"The channel does not exist",
      });
    }
    await Usuario.findOneAndUpdate({ _id: user }, { $push: { channels: channel } }, { new: true });
    let us = {name: usuario.name, img: usuario.img, _id: usuario._id}
    await Canal.findOneAndUpdate({ _id: channel }, { $push: { members: us } }, { new: true });

    res.status(201).json({
      ok: true,
      msg:"The channel was added successfully",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator "+error
    })
    
  }
}


const crearCanal = async (req, res = response) => {
  try {
    
    let canal = await Canal.findOne({ name: req.body.name});
    if(canal){
        return res.json({
            ok: false,
            msg: "The channel already exists",
        });
    }
    canal = new Canal(req.body);
    await canal.save();

    res.status(201).json({
        ok: true,
        canal
    })

  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Please talk to the administrator",
    });
  }
};

const eliminarCanal = async (req, res = response) => {
    try {
        let canal = await Canal.findOne({ id: req.body.id });
        if(canal){
            Canal.findByIdAndDelete(canal._id)
            return res.status(400).json({
                ok: true,
            });
        }
        return res.status(400).json({
            ok: false,
            msg: "The channel does not exist",
        });
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Please talk to the administrator",
      });
    }
  };

  const agregarMsg = async (req, res = response) => {
    try {
      //msg contains user info (name, img), content and date
      let {channel_id, msg} = req.body;
      let canal = Canal.findById(channel_id);
      if(!canal){
        res.json({
          ok: false,
          msg:"The channel does not exist",
        });
      }
      await Canal.findOneAndUpdate({ _id: channel_id }, { $push: { messages: msg } }, { new: true });
      res.status(201).json({
        ok: true,
        msg:"The message was added successfully",
      });
      
    } catch (error) {
      res.status(500).json({
        ok: false,
        msg: "Please talk to the administrator",
      });
      
    }


  }




module.exports = {dvChannels, crearCanal, eliminarCanal, agregarCanal, agregarMsg};
