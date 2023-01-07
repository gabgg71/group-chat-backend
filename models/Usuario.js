const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
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
        required: true, 
        unique: true
    },
    password: {
        type: String,
      }
});


module.exports= model('Usuario', UsuarioSchema); 