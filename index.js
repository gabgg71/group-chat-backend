const express = require('express');
const { dbConnection } = require('./database/config');


require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());


dbConnection();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/edit', require('./routes/edit'));


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
