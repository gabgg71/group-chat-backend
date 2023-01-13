const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    user:{
        type: String, 
        unique: true
    },
    img:{
        type: String
    },
    name:{
        type: String
    },
    bio:{
        type: String
    },
    phone:{
        type: String
    },
    email:{
        type: String, 
        unique: true
    },
    password: {
        type: String,
      }
});


module.exports= model('Usuario', UsuarioSchema); 