var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var fs = require('fs');
var path = require('path');
var Twit = require('twit');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var T = new Twit({
  consumer_key:         'XXX',
  consumer_secret:      'XXX',
  access_token:         'XXX',
  access_token_secret:  'XXX',
  timeout_ms:           60*1000,
});

var A = new Twit({
  consumer_key:         'XXX',
  consumer_secret:      'XXX',
  access_token:         'XXX',
  access_token_secret:  'XXX',
  timeout_ms:           60*1000,
});

var L = new Twit({
  consumer_key:         'XXX',
  consumer_secret:      'XXX',
  access_token:         'XXX',
  access_token_secret:  'XXX',
  timeout_ms:           60*1000,
});

var C = new Twit({
  consumer_key:         'XXX',
  consumer_secret:      'XXX',
  access_token:         'XXX',
  access_token_secret:  'XXX',
  timeout_ms:           60*1000,
})

io.sockets.on('connection', function (socket) {
	socket.on('people', function (data) {
		console.log(data);
		var conspiracy = data.conspiracy;
		var liberal = data.liberal;
		var conservative = data.conservative;
		var altright = data.altright;

		T.post('statuses/update', { status: conspiracy }, function(err, data, response) {
			console.log(data.id_str);
			A.post('statuses/update', { in_reply_to_status_id: data.id_str,  status: '@ElConspiracist ' + altright }, function (err, data, res) {
				console.log(data);
				L.post('statuses/update', { in_reply_to_status_id: data.id_str,  status: '@El_Altright ' + liberal }, function (err, data, res) {
					console.log(data);
					C.post('statuses/update', { in_reply_to_status_id: data.id_str,  status: '@El_Liberale ' + conservative }, function (err, data, res) {
						console.log(data);
						let num = data.id_str;
						socket.emit('idstring', {
							'id':num
						});
					});
				});
			});
		   });
        });
});

server.listen(8080, function () {
  console.log('Server listening on port 8080!')
});

app.use(express.static('public'));
