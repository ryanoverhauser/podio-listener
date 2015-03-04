var config = require('./config.json'),
	express = require('express'),
	app = express(),
	bodyParser = require("body-parser"),
	server = require('http').Server(app),
	io = require('socket.io')(server),
	rest = require('restler');

app.use(bodyParser.urlencoded({ extended: false }));

// Request Handler
app.post("/", function(req, res){
	switch(req.body.type) {
		case 'hook.verify':
			var url = 'https://api.podio.com/hook/' + req.body.hook_id + '/verify/validate';
			var data = { "code": req.body.code };
			rest.postJson(url, data);
			res.status(200).end();
			break;
		case 'item.create':
			io.emit('item.create', req.body);
			res.status(200).end();
			break;
		case 'item.update':
			io.emit('item.update', req.body);
			res.status(200).end();
			break;
		case 'item.delete':
			io.emit('item.delete', req.body);
			res.status(200).end();
			break;
		case 'comment.create':
			io.emit('comment.create', req.body);
			res.status(200).end();
			break;
		case 'comment.delete':
			io.emit('comment.delete', req.body);
			res.status(200).end();
			break;
		case 'file.change':
			io.emit('file.change', req.body);
			res.status(200).end();
			break;
		case 'app.update':
			io.emit('app.update', req.body);
			res.status(200).end();
			break;
		case 'app.delete':
			io.emit('app.delete', req.body);
			res.status(200).end();
			break;
		default:
			res.status(404).end();
	}
});

// Start Server
var server_port = process.env.OPENSHIFT_NODEJS_PORT || config.port;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || config.ip;
server.listen(server_port, server_ip_address, function(){
  console.log('listening on port ' + server_ip_address + ':' + server_port + '...');
});
