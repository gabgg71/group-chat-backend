const mongoose = require('mongoose');

const dbConnection = async()=>{
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.DB_CNN);
    } catch (error) {
        throw new Error('Error with db'+error);
    }
}

module.exports = {
    dbConnection
}