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
		var u = new user();
		u.login_id = 'test' + i;
		u.login_password = SHA256("" + i);
		users.push(u);
	}
}



// URLs
app.get('/', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello World!');
});

app.post('/login', function (req, res) {

	var login_id = req.body.email;
	var login_password = SHA256(req.body.password);

	var idFound = users.find((user) => user.login_id == login_id);

	if(idFound){

		if(idFound.login_password == login_password){
			res.writeHead(200, {'Content-Type': 'text/html'});
    		res.end('{token : ' + SHA256(login_id + login_password) + '}');
		}
		else{
			res.writeHead(404, {'Content-Type': 'text/html'});
    		res.end('Password doesn\'t match');
		}

	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('User e-mail not found');
	}

    
});

app.post('/register', function (req, res) {

	var user_id = user_count;
	var login_id = req.body.email;

	var login_password = SHA256(req.body.password);
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

	if(login_id && user_nickname && login_password && pet_name){

		if(login_id.includes('@')){

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
	    	res.end('{user_id : ' + user_id  + ', pet_id :' + pet_id + ', success : true}');
    	}
    	else{
    		res.writeHead(404, {'Content-Type': 'text/html'});
    		res.end('User ID is not email-form');
    	}

	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('Mandatory datum are not provided');
	}
    
});

app.get('/user/:user_id', function (req, res) {

	var user_id = req.params.user_id;

	if(user_id < user_count){
	    res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end('{user_id : ' + users[user_id].user_id + ', ' +
	    		'email : ' + users[user_id].login_id + ', ' +
	    		'username : ' + users[user_id].user_nickname + ', ' + 
	    		'userProfileImage : ' + users[user_id].profile_pic_url + ', ' + 
				'introduceText : ' + users[user_id].intro + ', ' +
				'pet_id : ' + 'NOT IMPLEMENTED' + ', ' + 
				'card_id : ' + 'NOT IMPLEMENTED' + ', ' + 
				'userBirthDay : ' + 'NOT IMPLEMENTED' + ', ' + 
				'totalPost : ' + 'NOT IMPLEMENTED' + ', ' +
				'totalFollowing : ' + 'NOT IMPLEMENTED' + ', ' +
				'totalFollowed : ' + 'NOT IMPLEMENTED' + ', ' +
				'followingNames : ' + 'NOT IMPLEMENTED' + '}');
	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('No user is found');
	}

});

app.get('/user', function (req, res) {

	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query,'&','=');

	var userEmail = parsedQuery.userEmail;

	var idFound = users.find((user) => user.login_id == userEmail);

	if(idFound){

		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end('{userProfileImage : ' + idFound.profile_pic_url + ', userEmail : ' + userEmail + ', introduceText : ' + idFound.intro + '}');

	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('User e-mail not found');
	}


});

app.get('/userFilter', function (req, res) {

	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query,'&','=');

	var userEmail = parsedQuery.userEmail;

	var idFound = users.filter((user) => user.login_id.includes(userEmail));

	if(idFound){

		var json = '{num:' + idFound.length + ', result : [';

		idFound.forEach((u) => 
			json = json + '\"' + u.login_id + '\", '
    	)

    	json = json.substring(0, json.length-2) + ']}';

    	res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end(json);

	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('User e-mail not found');
	}


});

app.get('/pet', function (req, res) {

	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query,'&','=');

	var pet_id = parsedQuery.id;

	var idFound = pets.find((pet) => pet.pet_id == pet_id);

	if(idFound){

		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end('{petProfileImage : ' + idFound.profile_pic_url + ', petName : ' + idFound.pet_name + '}');
	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('The pet is not found');
	}


});

app.post('/pet', function (req, res) {

	var petName = req.body.petName;

	if(petName){

		var p = new pet();
		p.pet_name = petName;

		addPet(p);

		res.writeHead(200, {'Content-Type': 'text/html'});
	    res.end('{pet_id :' + p.pet_id + ', success : true}');

	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('Pet\'s name is not provided');
	}

});

app.get('/pet/:pet_id', function (req, res) {

	//var parsedUrl = url.parse(request.url);
	//var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
	var pet_id = req.params.pet_id;

	if(pet_id < pet_count){
		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end('{pet_id : ' + pets[pet_id].pet_id + ', ' +
    		'petName = ' + pets[pet_id].pet_name + '}');
	}
	else{
		res.writeHead(404, {'Content-Type': 'text/html'});
    	res.end('No pet is found');
	}

    
});


app.listen(port, function (){
	console.log('PetStagram listening on port ' + port);
	dev_init(); // TODO database connection
});

function SHA256(s){
      
        var chrsz   = 8;
        var hexcase = 0;
      
        function safe_add (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF);
            var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
      
        function S (X, n) { return ( X >>> n ) | (X << (32 - n)); }
        function R (X, n) { return ( X >>> n ); }
        function Ch(x, y, z) { return ((x & y) ^ ((~x) & z)); }
        function Maj(x, y, z) { return ((x & y) ^ (x & z) ^ (y & z)); }
        function Sigma0256(x) { return (S(x, 2) ^ S(x, 13) ^ S(x, 22)); }
        function Sigma1256(x) { return (S(x, 6) ^ S(x, 11) ^ S(x, 25)); }
        function Gamma0256(x) { return (S(x, 7) ^ S(x, 18) ^ R(x, 3)); }
        function Gamma1256(x) { return (S(x, 17) ^ S(x, 19) ^ R(x, 10)); }
      
        function core_sha256 (m, l) {
             
            var K = new Array(0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1,
                0x923F82A4, 0xAB1C5ED5, 0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
                0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174, 0xE49B69C1, 0xEFBE4786,
                0xFC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
                0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147,
                0x6CA6351, 0x14292967, 0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
                0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85, 0xA2BFE8A1, 0xA81A664B,
                0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
                0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A,
                0x5B9CCA4F, 0x682E6FF3, 0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
                0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2);
 
            var HASH = new Array(0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19);
 
            var W = new Array(64);
            var a, b, c, d, e, f, g, h, i, j;
            var T1, T2;
      
            m[l >> 5] |= 0x80 << (24 - l % 32);
            m[((l + 64 >> 9) << 4) + 15] = l;
      
            for ( var i = 0; i<m.length; i+=16 ) {
                a = HASH[0];
                b = HASH[1];
                c = HASH[2];
                d = HASH[3];
                e = HASH[4];
                f = HASH[5];
                g = HASH[6];
                h = HASH[7];
      
                for ( var j = 0; j<64; j++) {
                    if (j < 16) W[j] = m[j + i];
                    else W[j] = safe_add(safe_add(safe_add(Gamma1256(W[j - 2]), W[j - 7]), Gamma0256(W[j - 15])), W[j - 16]);
      
                    T1 = safe_add(safe_add(safe_add(safe_add(h, Sigma1256(e)), Ch(e, f, g)), K[j]), W[j]);
                    T2 = safe_add(Sigma0256(a), Maj(a, b, c));
      
                    h = g;
                    g = f;
                    f = e;
                    e = safe_add(d, T1);
                    d = c;
                    c = b;
                    b = a;
                    a = safe_add(T1, T2);
                }
      
                HASH[0] = safe_add(a, HASH[0]);
                HASH[1] = safe_add(b, HASH[1]);
                HASH[2] = safe_add(c, HASH[2]);
                HASH[3] = safe_add(d, HASH[3]);
                HASH[4] = safe_add(e, HASH[4]);
                HASH[5] = safe_add(f, HASH[5]);
                HASH[6] = safe_add(g, HASH[6]);
                HASH[7] = safe_add(h, HASH[7]);
            }
            return HASH;
        }
      
        function str2binb (str) {
            var bin = Array();
            var mask = (1 << chrsz) - 1;
            for(var i = 0; i < str.length * chrsz; i += chrsz) {
                bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i%32);
            }
            return bin;
        }
      
        function Utf8Encode(string) {
            string = string.replace(/\r\n/g,"\n");
            var utftext = "";
      
            for (var n = 0; n < string.length; n++) {
      
                var c = string.charCodeAt(n);
      
                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
      
            }
      
            return utftext;
        }
      
        function binb2hex (binarray) {
            var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
            var str = "";
            for(var i = 0; i < binarray.length * 4; i++) {
                str += hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8+4)) & 0xF) +
                hex_tab.charAt((binarray[i>>2] >> ((3 - i%4)*8  )) & 0xF);
            }
            return str;
        }
      
        s = Utf8Encode(s);
        return binb2hex(core_sha256(str2binb(s), s.length * chrsz));
      
}
