var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jsonfile = require('jsonfile');
var fs = require('fs');
var path = require('path');
var Twit = require('twit');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var T = new Twit({
  consumer_key:         'Uk7tsrX3tqWA1Kj93YajzyAU6',
  consumer_secret:      'DwsekYKyinrxbCgZLW7tHaxwtepgCWNSES5fSaZLhjVnDeXuVA',
  access_token:         '917860568337436674-CaoXi519Cd2ELriBrdTmZZTmCcByZ1p',
  access_token_secret:  'xFLI8Ly7l5cAGcfeocC0GffmiDkXnVzsR2DGujcoRCHzF',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var A = new Twit({
  consumer_key:         'FlSPiDZMjw8HWPFVwonz7jqz5',
  consumer_secret:      'YnnrAik7WLComN4xDXKm1g5NvXCa6O0McT0hphbKvWqPxYWuKD',
  access_token:         '918663975574917120-UmXjUDFfho5D5W6G7a5u7Me4vLjIBXd',
  access_token_secret:  'DKwzPXlKLS4Bnleie5Y5XrIFQrYGqcYNgJsY86JDQrBcS',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var L = new Twit({
  consumer_key:         'pAkUd5LilzU1EPyUX7jUofdHd',
  consumer_secret:      'OzeBvr893UrkrrcTOpHd13MGDUAotc0XD531bRJl8MM1TnKCnJ',
  access_token:         '918656617671004161-yNaFWgoQEppAIPmPb0ejqcuEUNjd4EQ',
  access_token_secret:  'GhnN8gCkfGB932T29kOWwiC6pLSQOH26v3rwIRGmkZjw0',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

var C = new Twit({
  consumer_key:         'RRwNqYIW2RjTmWORhVTFc29cl',
  consumer_secret:      'R8DMQ2gxCaFqLjU9jqSJvA10mSZJfasoMNWAQQFtuJbV7lGTK2',
  access_token:         '918644292347924480-gkuWVn3nokkFmgD48Ki7NyL2VmQ0RoN',
  access_token_secret:  'eOsrwsYj7YIbKXP0OCv1zMdUFYeGMR8X7RrKnIfKKvRLb',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

io.sockets.on('connection', function (socket) {
	socket.on('people', function (data) {
 		console.log(data);
 		var conspiracy = data.conspiracy;
		var liberal = data.liberal;
		var conservative = data.conservative;
		var altright = data.altright;

		T.post('statuses/update', { status: conspiracy }, function(err, data, response) {
			console.log(data.id_str);
      //let num = data.id_str;
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


//anonymous function
server.listen(8080, function () {
  console.log('Server listening on port 8080!')
});

app.use(express.static('public'));
