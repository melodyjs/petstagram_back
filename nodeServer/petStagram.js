const express = require('express');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var headerContent = {'Access-Control-Allow-Origin': '*', 'Content-Type': 'text/html'};

app.use(bodyParser.json());

var http = require('http');
var url = require('url');
var querystring = require('querystring');


// Port Setting
var port = 8000;


// Debug mode ON/OFF
var debug = true;
var localDB = true;
var sampleDB = true;


// Local database for dev
var user_count = 0;
var users = [];

var pet_count = 0;
var pets = [];

var card_count = 0;
var cards = [];

var tag_count = 0;
var tags = [];

var like_count = 0;
var likes = [];

var comment_count = 0;
var comments = [];

var picture_count = 0;
var pictures = [];

var video_count = 0;
var videos = [];


// Class & function for User
function user(){

	this.user_id = user_count++;
	this.login_id = "";
	this.login_password = "";
	this.user_nickname = "";
	this.profile_pic_url = "";
	this.sign_in_date = "";
	this.pet_id = [];
	this.card_id = [];
	this.following_id = [];
	this.followed_id = [];
	this.intro = "";

};

function addUser(user){

	if(localDB){
		users.push(user);
	}
	else{

	}
};

function modifyUser(userEmail, login_id, login_password, user_nickname, profile_pic_url, intro){

	if(localDB){
		var userWillModified = users.find((u) => u.login_id == userEmail);

		if(login_id)
			userWillModified.login_id = login_id;
		if(login_password)
			userWillModified.login_password = login_password;
		if(user_nickname)
			userWillModified.user_nickname = user_nickname;
		if(profile_pic_url)
			userWillModified.profile_pic_url = profile_pic_url;		
		if(intro)
			userWillModified.intro = intro;
	}
	else{

	}

}

function deleteUser(userEmail){

	if(localDB){

		var userWillDeleted = users.find((u) => u.login_id == userEmail);

		var userWillDeleted_id = userWillDeleted.user_id;

		// TODO (delete pet if no owner exists & comment & like & followed) 

		users.splice(userWillDeleted_id,1);
	}
	else{

	}

}

function userFindByEmail(login_id){

	if(localDB){
		return users.find((user) => user.login_id == login_id);
	}
	else{

	}

};

function userEmailFilter(userEmail){

	if(localDB){
		return users.filter((user) => user.login_id.includes(userEmail));
	}
	else{

	}
};

function searchFollowing(u){

	if(localDB){
		return users.filter((user) => (u.following_id.find((usertemp) => usertemp.login_id == user.login_id)));
	}
	else{

	}

};

function isFollowing(userEmail1, userEmail2){

	if(localDB){
		return userEmail1.following_id.find((user) => userEmail2 == user.login_id);
	}
	else{

	}

};


// Class & function for Pet
function pet(){

	this.pet_id = pet_count++;
	this.user_id = 0;
	this.pet_name = "";
	this.profile_pic_url = "";
	this.card_id = [];
	this.intro = "";
	this.pet_birthday = "";

};

function addPet(owner_email, pet){

	if(localDB){
		var owner = userFindByEmail(owner_email);
		owner.pet_id.push(pet.pet_id);
		pets.push(pet);
	}
	else{

	}
};

function deletePet(pet_id){

	if(localDB){

		var petWillDeleted = pets.find((p) => p.pet_id == pet_id);

		petWillDeleted.card_id.forEach((c) =>
			deleteCard(c)
		);

		var owners = users.filter((u) => (u.pet_id.find((p) => p == pet_id)));

		owners.forEach((u) =>
			u.pet_id = u.pet_id.filter((p) => p != pet_id)
		);

		pets.splice(pet_id,1);
	}
	else{

	}

}

function isPetExist(pet_id){

	if(localDB){
		var e = pets.find((p) => p.pet_id == pet_id);
		if(e)
			return true;
		else
			return false;
	}
	else{

	}

}

function petFindById(pet_id){

	if(localDB){
		return pets.find((p) => p.pet_id == pet_id);
	}
	else{

	}

};

function ownerExist(owner){

	if(localDB){
		return users.find((user) => user.login_id == owner);
	}
	else{

	}

};

function userPetArray(user){

	if(localDB){
		return pets.filter((pet) => (user.pet_id.find((id) => pet.pet_id == id)));
	}
	else{

	}

}


// Class & function for Card
function card(){

	this.card_id = card_count++;
	this.date = Date.now();
	this.location = "";
	this.text = "";
	this.tag_id = [];
	this.like_id = [];
	this.comment_id = [];
	this.video_id = [];
	this.picture_id = [];

}

function addCard(card){

	if(localDB){
		cards.push(card);
	}
	else{

	}
}

function deleteCard(card_id){

	if(localDB){

		var cardWillDeleted = cards.find((c) => c.card_id == card_id);

		cardWillDeleted.tag_id.forEach((t) =>
			deleteTag(t)
		);

		cardWillDeleted.comment_id.forEach((c) =>
			deleteComment(c)
		);

		cardWillDeleted.like_id.forEach((l) =>
			deleteLike(l)
		);

		cardWillDeleted.picture_id.forEach((p) =>
			deletePicture(p)
		);

		cardWillDeleted.video_id.forEach((v) =>
			deleteVideo(v)
		);

		pets.splice(card_id,1);
	}
	else{

	}

}


// Class & function for Tag
function tag(){

	this.tag_id = tag_count++;
	this.used_number = 0;
	this.tag_text = "";

}

function addTag(tag){
	if(localDB){
		tags.push(tag);
	}
	else{

	}
}

function deleteTag(tag_id){

	if(localDB){
		tags.splice(tag_id,1);
	}
	else{

	}

}


// Class & function for Like
function like(){

	this.like_id = like_count++;
	this.date = Date.now();
	this.user_id = 0;

}

function addLike(like){
	if(localDB){
		likes.push(like);
	}
	else{

	}
}

function deleteLike(like_id){

	if(localDB){
		likes.splice(like_id,1);
	}
	else{

	}

}


// Class & function for Comment
function comment(){
	this.comment_id = comment_count++;
	this.text = "";
	this.date = Date.now();
	this.user_id = 0;
}

function addComment(comment){
	if(localDB){
		comments.push(comment);
	}
	else{

	}
}

function deleteComment(comment_id){

	if(localDB){
		comments.splice(comment_id,1);
	}
	else{

	}

}


// Class & function for Picture
function picture(){
	this.picture_id = picture_count++;
	this.picture_url = "";
	this.size = 0;
}

function addPicture(picture){
	if(localDB){
		pictures.push(picture);
	}
	else{

	}
}

function deletePicture(picture_id){

	if(localDB){
		pictures.splice(picture_id,1);
	}
	else{

	}

}


// Class & function for Video
function video(){
	this.video_id = video_count++;
	this.video_url = "";
	this.size = 0;
}

function addVideo(video){
	if(localDB){
		videos.push(video);
	}
	else{

	}
}

function deleteVideo(video_id){

	if(localDB){
		videos.splice(video_id,1);
	}
	else{

	}

}


// Sample database creation
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
    res.writeHead(200, headerContent);
    res.end('Hello World!');
});

app.post('/login', function (req, res) {

	var login_id = req.body.email;
	var login_password = SHA256(req.body.password);

	if(debug){
		console.log('***********************' +
			        '[/login] POST\n ' + 
			        'email = ' + login_id + '\n' +
			        'password = ' + req.body.password);
	}

	var idFound = userFindByEmail(login_id);

	if(idFound){

		if(idFound.login_password == login_password){

			if(debug){
				console.log('<Login Success>');
				console.log('***********************');
			}

			res.writeHead(200, headerContent);
    		res.write('{\"token\" : \"' + SHA256(login_id + login_password) + '\"}');
    		res.end();
		}
		else{

			if(debug){
				console.log('Login Failed(Password not match');
				console.log('***********************');
			}

			res.writeHead(404, headerContent);
    		res.write('Password doesn\'t match');
    		res.end();
		}

	}
	else{

		if(debug){
			console.log('Login Failed(E-mail not found)');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('User e-mail not found');
    	res.end();
	}

    
});

app.post('/register', function (req, res) {

	var user_id = user_count;
	var login_id = req.body.email;

	var login_password = SHA256(req.body.password);
	var user_nickname = req.body.username;
	var profile_pic_url = req.body.userProfileImage;
	var sign_in_date = Date.now();
	var intro = req.body.userIntroduceText;

	if(debug){
		console.log('***********************');
		console.log('[/register] POST');
		console.log('<USER>');
		console.log('user_id = ' + user_id);
		console.log('login_id = ' + login_id);
		console.log('login_password = ' + login_password);
		console.log('user_nickname = ' + user_nickname);
		console.log('profile_pic_url = ' + profile_pic_url);
		console.log('sign_in_date = ' + sign_in_date);
		console.log('intro = ' + intro);
	}

	var pet_name = req.body.petName;
	var pet_id = pet_count;
	var profile_pic_url = req.body.petProfileImage;
	var intro = req.body.petIntroduceText;

	if(debug){
		console.log('<PET>');
		console.log('pet_id = ' + pet_id);
		console.log('pet_name = ' + pet_name);
		console.log('profile_pic_url = ' + profile_pic_url);
		console.log('intro = ' + intro);
	}

	var idExist = userFindByEmail(login_id);

	if(login_id && user_nickname && login_password && pet_name){

		if(!idExist){

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

				if(debug){
					console.log('<Register SUCCESS>');
					console.log('***********************');
				}

				res.writeHead(200, headerContent);
		    	res.write('{\"user_id\" : ' + user_id  + ', \"pet_id\" : ' + pet_id + ', \"success\" : True}');
		    	res.end();
	    	}
	    	else{

	    		if(debug){
					console.log('Register FAILED(Email form error)');
					console.log('***********************');
				}

	    		res.writeHead(404, headerContent);
	    		res.write('User ID is not email-form');
	    		res.end();
	    	}
    	}
    	else{

    		if(debug){
				console.log('Register FAILED(Email already exists)');
				console.log('***********************');
			}

    		res.writeHead(404, headerContent);
    		res.write('Email Address already exists');
    		res.end();

    	}

	}
	else{

		if(debug){
			console.log('Register FAILED(Insufficient datum)');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('Mandatory datum are not provided');
    	res.end();
	}
    
});

app.get('/user/:user_email', function (req, res) {

	var user_email = req.params.user_email;

	var u = userFindByEmail(user_email);

	if(debug){
		console.log('***********************');
		console.log('[/user/:user_email] GET');
		console.log('user_email = ' + user_email);
	}

	if(u){

		var following = searchFollowing(u);
		var followingNames = '[';

		following.forEach((f) => 

			followingNames = followingNames + '\"' + f.user_nickname + '\",'

		);

		if(following.length > 0){
			followingNames = followingNames.substring(0, json.length-1) + ']';
		}
		else{
			followingNames = followingNames + ']';
		}

		if(debug){
			console.log('<FOLLOWING FOUND>');
			console.log('{\"user_id\" : ' + u.user_id + ', ' +
	    		'\"email\" : \"' + u.login_id + '\", ' +
	    		'\"username\" : \"' + u.user_nickname + '\", ' + 
	    		'\"userProfileImage\" : \"' + u.profile_pic_url + '\", ' + 
				'\"introduceText\" : \"' + u.intro + '\", ' +
				'\"pet_id\" : ' + u.pet_id + ', ' + 
				'\"card_id\" : ' + u.card_id + ', ' + 
				'\"userBirthDay\" : \"' + u.userBirthDay + '\", ' + 
				'\"totalPost\" : ' + u.card_id.length + ', ' +
				'\"totalFollowing\" : ' + u.following_id.length + ', ' +
				'\"totalFollowed\" : ' + u.followed_id.length + ', ' +
				'\"followingNames\" : ' + followingNames + '}');
			console.log('***********************');
		}

	    res.writeHead(200, headerContent);
	    res.write('{\"user_id\" : ' + u.user_id + ', ' +
	    		'\"email\" : \"' + u.login_id + '\", ' +
	    		'\"username\" : \"' + u.user_nickname + '\", ' + 
	    		'\"userProfileImage\" : \"' + u.profile_pic_url + '\", ' + 
				'\"introduceText\" : \"' + u.intro + '\", ' +
				'\"pet_id\" : ' + u.pet_id + ', ' + 
				'\"card_id\" : ' + u.card_id + ', ' + 
				'\"userBirthDay\" : \"' + u.userBirthDay + '\", ' + 
				'\"totalPost\" : ' + u.card_id.length + ', ' +
				'\"totalFollowing\" : ' + u.following_id.length + ', ' +
				'\"totalFollowed\" : ' + u.followed_id.length + ', ' +
				'\"followingNames\" : ' + followingNames + '}');
	    res.end();
	}
	else{

		if(debug){
			console.log('USER NOT FOUND');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('No user is found');
    	res.end();
	}

});

app.get('/user', function (req, res) {

	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query,'&','=');

	var userEmail = parsedQuery.userEmail;
	var userEmail2 = parsedQuery.userEmail2;

	if(debug){
		console.log('***********************');
		console.log('[/user] GET');
		console.log('user_email = ' + user_email);
	}

	if(!userEmail2){

		var idFound = userFindByEmail(userEmail);

		if(idFound){

			if(debug){
				console.log('<USER FOUND>');
				console.log('{\"userProfileImage\" : \"' + idFound.profile_pic_url + '\", \"userEmail\" : \"' + userEmail + '\", \"introduceText\" : \"' + idFound.intro + '\"}');
				console.log('***********************');
			}

			res.writeHead(200, headerContent);
	    	res.write('{\"userProfileImage\" : \"' + idFound.profile_pic_url + '\", \"userEmail\" : \"' + userEmail + '\", \"introduceText\" : \"' + idFound.intro + '\"}');
	    	res.end();
		}
		else{

			if(debug){
				console.log('USER E-MAIL NOT FOUND');
				console.log('***********************');
			}

			res.writeHead(404, headerContent);
	    	res.write('User e-mail not found');
	    	res.end();
		}
	}
	else{
		var idFound = userFindByEmail(userEmail);

		if(idFound){

			var following = isFollowing(idFound, userEmail2);

			if(following){

				if(debug){
					console.log('<Following True>');
					console.log('***********************');
				}

				res.writeHead(200, headerContent);
	    		res.write('{ \"isFollow\" : True }');
	    		res.end();

			}
			else{

				if(debug){
					console.log('<Following False>');
					console.log('***********************');
				}

				res.writeHead(200, headerContent);
	    		res.write('{ \"isFollow\" : False }');
	    		res.end();

			}

		}
		else{

			if(debug){
				console.log('USER E-MAIL NOT FOUND');
				console.log('***********************');
			}

			res.writeHead(404, headerContent);
	    	res.write('userEmail is not found');
	    	res.end();
		}

	}


});

app.get('/userFilter', function (req, res) {

	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query,'&','=');

	var userEmail = parsedQuery.userEmail;

	if(debug){
		console.log('***********************');
		console.log('[/userFilter] GET');
		console.log('userEmail = ' + userEmail);
	}

	var idFound = userEmailFilter(userEmail);

	if(idFound){

		var json = '{\"num\":' + idFound.length + ', \"result\" : [';

		idFound.forEach((u) => 
			json = json + '\"' + u.login_id + '\", '
    	)

		if(idFound.length > 0){
    		json = json.substring(0, json.length-2) + ']}';
    	}
    	else{
    		json = json + ']}';
    	}

    	if(debug){
    		console.log('<FILTER SUCCESS>');
    		console.log(json);
    		console.log('***********************');
    	}

    	res.writeHead(200, headerContent);
	    res.write(json);
	    res.end();

	}
	else{

		if(debug){
			console.log('USER E-MAIL NOT FOUND');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('User e-mail not found');
    	res.end();
	}


});

app.get('/pet', function (req, res) {

	var parsedUrl = url.parse(req.url);
	var parsedQuery = querystring.parse(parsedUrl.query,'&','=');

	var pet_id = parsedQuery.id;

	if(debug){
		console.log('***********************');
		console.log('[/pet] GET');
		console.log('id = ' + pet_id);
	}

	var idFound = petFindById(pet_id);

	if(idFound){

		if(debug){
			console.log('<PET FOUND>');
			console.log('{\"petProfileImage\" : \"' + idFound.profile_pic_url + '\", \"petName\" : \"' + idFound.pet_name + '\"}');
			console.log('***********************');
		}

		res.writeHead(200, headerContent);
    	res.write('{\"petProfileImage\" : \"' + idFound.profile_pic_url + '\", \"petName\" : \"' + idFound.pet_name + '\"}');
    	res.end();
	}
	else{

		if(debug){
			console.log('PET NOT FOUND');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('The pet is not found');
    	res.end();
	}


});

app.post('/pet', function (req, res) {

	var petName = req.body.petName;
	var petProfileImage = req.body.petProfileImage;
	var petBirthDay = req.body.petBirthDay;
	var introduceText = req.body.introduceText;
	var owner = req.body.owner;

	if(debug){
		console.log('***********************');
		console.log('[/pet] POST');
		console.log('petName = ' + petName);
		console.log('owner = ' + owner);
		console.log('petProfileImage = ' + petProfileImage);
		console.log('petBirthDay = ' + petBirthDay);
		console.log('introduceText = ' + introduceText);
	}

	if(petName && owner){

		var u = ownerExist(owner);

		if(u){

			var p = new pet();
			p.pet_name = petName;
			p.owner = owner;

			if(petProfileImage)
				p.profile_pic_url = petProfileImage;
			if(petBirthDay)
				p.pet_birthday = petBirthDay;
			if(introduceText)
				p.intro = introduceText;

			addPet(owner, p);

			if(debug){
				console.log('<PET CREATED>');
				console.log('{\"pet_id\" : ' + p.pet_id + ', \"success\" : True }');
				console.log('***********************');
			}

			res.writeHead(200, headerContent);
		    res.write('{\"pet_id\" : ' + p.pet_id + ', \"success\" : True }');
		    res.end();
		}
		else{

			if(debug){
				console.log('PET NOT FOUND(Invalid owner email)');
				console.log('***********************');
			}

			res.writeHead(404, headerContent);
	    	res.write('Invalid owner e-mail');
	    	res.end();
		}

	}
	else{

		if(debug){
			console.log('PET NOT FOUND(Insufficent datum provided(petName & owner))');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('Insufficent datum provided(petName & owner)');
    	res.end();
	}

});

app.get('/pet/:pet_id', function (req, res) {

	var pet_id = req.params.pet_id;

	if(debug){
		console.log('***********************');
		console.log('[/pet/:pet_id] GET');
		console.log('pet_id = ' + pet_id);
	}

	if(isPetExist(pet_id)){

		if(debug){
			console.log('<PET FOUND>');
			console.log('{\"id\" : ' + pets[pet_id].pet_id + ', ' +
    			   '\"petName\" : \"' + pets[pet_id].pet_name + '\", ' +
    			   '\"petProfileImage\" : \"' + pets[pet_id].profile_pic_url + '\", ' +
    			   '\"petBirthDay\" : \"' + pets[pet_id].pet_birthday + '\", ' +
    			   '\"owner\" : \"' + pets[pet_id].owner + '\"}');
			console.log('***********************');
		}


		res.writeHead(200, headerContent);
    	res.write('{\"id\" : ' + pets[pet_id].pet_id + ', ' +
    			   '\"petName\" : \"' + pets[pet_id].pet_name + '\", ' +
    			   '\"petProfileImage\" : \"' + pets[pet_id].profile_pic_url + '\", ' +
    			   '\"petBirthDay\" : \"' + pets[pet_id].pet_birthday + '\", ' +
    			   '\"owner\" : \"' + pets[pet_id].owner + '\"}');
    	res.end();
	}
	else{

		if(debug){
			console.log('PET NOT FOUND');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('No pet is found');
    	res.end();
	}

    
});

app.post('/card', function (req, res) {

	var pets = req.body.pets;
	var pictures = req.body.picture;
	var videos = req.body.video;
	var title = req.body.title;
	var text = req.body.text;

	if(debug){
		console.log('***********************');
		console.log('[/card] POST');
		console.log('title = ' + title);
		console.log('pets = ' + pets);
		console.log('text = ' + text);
		console.log('picture = ' + pictures);
		console.log('video = ' + videos);
	}

	if(title){

		var c = new card();
		c.title = title;
		c.text = text;

		//TODO picture & video save

		addCard(c);

		if(debug){
			console.log('<CARD CREATED>');
			console.log('{\"card_id\" : ' + c.card_id + ', \"success\" : True }');
			console.log('***********************');
		}

		res.writeHead(200, headerContent);
	    res.write('{\"card_id\" : ' + c.card_id + ', \"success\" : True }');
	    res.end();

	}
	else{

		if(debug){
			console.log('TITLE NOT PROVIDED');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('Title is not provided');
    	res.end();
	}

});

app.get('/userPet/:userEmail', function (req, res) {

	var login_id = req.params.userEmail;

	if(debug){
		console.log('***********************');
		console.log('[/userPet/:userEmail] POST');
		console.log('userEmail = ' + login_id);
	}

	var idFound = userFindByEmail(login_id);

	if(idFound){

		var json = '{\"pets\" : [';

		var petFound = userPetArray(idFound); 

		petFound.forEach((p) => 

			json = json + '{ \"petProfileImage\" : \"' + p.profile_pic_url + '\",' +
							'\"petName\" : \"' +  p.pet_name + '\", ' +
							'\"id\" : ' +  p.pet_id + ', ' +
							'\"petBirthDay\" : \"' +  p.pet_birthday + '\", ' +
							'\"introduceText\" : \"' +  p.intro + '\", ' + 
							'\"owner\" : \"' +  p.user_id + '\" },'
    	)

		if(petFound.length > 0){
    		json = json.substring(0, json.length-1) + ']}';
    	}
    	else{
    		json = json + ']}';
    	}

    	if(debug){
			console.log('<USER\'S PET FOUND>');
			console.log(json);
			console.log('***********************');
		}

    	res.writeHead(200, headerContent);
	    res.write(json);
	    res.end();

	}
	else{

		if(debug){
			console.log('NO USER FOUND');
			console.log('***********************');
		}

		res.writeHead(404, headerContent);
    	res.write('No user is found');
    	res.end();
	}
    
});


app.listen(port, function (){
	console.log('PetStagram listening on port ' + port);
	if(sampleDB){
		dev_init(); 
	}
});


// Password Encryption
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
