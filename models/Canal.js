const {Schema, model} = require('mongoose');

const CanalSchema = Schema({
    name:{
        type: String, 
        unique: true
    },
    description:{
        type: String
    }, 
    admin:{
        type: String
    },
    bio:{
        type: String
    },
    messages:[{
        type: [
            Schema.Types.Mixed
          ],
        default: []
    }], 
    members: {
        type: [
            Schema.Types.Mixed
        ],
        default: []
    },

}, { versionKey: false });


module.exports= model('Canal', CanalSchema); 