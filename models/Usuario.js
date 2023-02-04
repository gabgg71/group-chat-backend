const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    user:{
        type: String,
        unique: true,
        sparse: true
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
      }, 
    channels:{
        type:  [
            String
          ],
        default: []
    },
},{ versionKey: false });


module.exports= model('Usuario', UsuarioSchema); 