const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var http = require('http');
var url = require('url');
var querystring = require('querystring');
var port = 8000;

// Debugging mode
var debug = false;


// Database for dev
var user_count = 0;
var users = [];

var pet_count = 0;
var pets = [];

function user(){

	this.user_id = user_count++;
	this.login_id = "";
	this.login_password = "";
	this.user_nickname = "";
	this.profile_pic_url = "";
	this.sign_in_date = "";
	this.intro = "";

};

function addUser(user){
	users.push(user);
	//TODO connect database
}

function pet(){

	this.pet_id = pet_count++;
	this.pet_name = "";
	this.profile_pic_url = "";
	this.intro = "";

};

function addPet(pet){
	pets.push(pet);
	//TODO connect database
}

function dev_init(){
	for(var i=0; i<10; i++){
		users.push(new user());
	}
}



// URLs
app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
});

app.post('/register', function (req, res) {

	var user_id = user_count;
	var login_id = req.body.email;

	var login_password = req.body.password;
	var user_nickname = req.body.username;
	var profile_pic_url = "";
	var sign_in_date = Date.now();
	var intro = "";

	if(debug){
		console.log('-----------------USER REGISTER------------');
		console.log('user_id = ' + user_id+1);
		console.log('login_id = ' + login_id);
		console.log('login_password = ' + login_password);
		console.log('user_nickname = ' + user_nickname);
		console.log('profile_pic_url = ' + profile_pic_url);
		console.log('sign_in_date = ' + sign_in_date);
		console.log('intro = ' + intro);
	}

	var pet_name = req.body.petName;
	var pet_id = pet_count;
	var profile_pic_url = "";
	var intro = "";

	if(debug){
		console.log('-----------------PET REGISTER-------------');
		console.log('pet_id = ' + pet_id+1);
		console.log('pet_name = ' + pet_name);
		console.log('profile_pic_url = ' + profile_pic_url);
		console.log('intro = ' + intro);
	}

	if(user_id && login_id && login_password && pet_name){

		var u = new user();
		u.user_id = user_id;
		u.login_id = login_id;
		u.login_password = login_password;
		u.sign_in_date = sign_in_date;

		addUser(u);

		var p = new pet();
		p.pet_name = pet_name;

		addPet(p);

		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end('{user_id : ' + user_id  + ', pet_id :' + pet_id + ', success :true}');

	}
	else{
		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end('{success:false}');
	}

    
});

app.get('/user/:user_id', function (req, res) {

	var user_id = req.params.user_id;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('user id = ' + users[user_id].user_id + '\n' +
    		'login_id = ' + users[user_id].login_id + '\n' +
    		'login_password = ' + users[user_id].login_password + '\n' +
    		'sign_in_date = ' + users[user_id].sign_in_date);
});

app.get('/pet/:pet_id', function (req, res) {

	//var parsedUrl = url.parse(request.url);
	//var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
	var pet_id = req.params.pet_id;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('pet id = ' + pets[pet_id].pet_id + '\n' +
    		'pet_name = ' + pets[pet_id].pet_name + '\n');
});


app.listen(port, function (){
	console.log('PetStagram listening on port ' + port);
	dev_init(); // TODO database connection
});