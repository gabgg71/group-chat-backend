const express = require('express');
const { dbConnection } = require('./database/config');


require('dotenv').config();
const cors = require('cors');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http);

io.on('connection', client => {
	client.on('unirse', (...data) =>{
		id = data[0].id
		info = data[0].info
		client.join(id);
		client.in(id).emit('member', {
			info
		});
	});


	client.on('disconnect', () => {
		client.leave(client.id);
	})

	
	client.on('send_message', (...message) => {
		channel = message[0];
		channel_id = channel.channel;
		msg = channel.msg;
		
		client.in(channel_id).emit('message', {
			channel_id, 
			msg
		});
	})

	client.on('new_member', (...member) => {
		channel = member[0];
		channel_id = channel.id;
		user = channel.user;
		
		client.in(channel_id).emit('new_member', {
			channel_id, 
			user
		});
	})

	client.on('error', function (err) {
		console.log(err);
	})
});
app.use(cors());


dbConnection();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/edit', require('./routes/edit'));
app.use('/api/channel', require('./routes/channel'));


http.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo`);
});
