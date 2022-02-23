const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Todo bien');
    } catch (error) {
        throw new Error('Error with db');
    }
}

module.exports = {
    dbConnection
}