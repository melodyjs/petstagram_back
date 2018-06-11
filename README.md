# Petstagram_back
Web site
Petstagram backend code

See [**Petstagram**](https://github.com/psi9730/pet-stagram) frontend

Node.js used

## Usage
1. Install node.js and express

2. Clone petstagram server file from github

`git clone https://github.com/melodyjs/petstagram_back.git`

3. Move to nodeServer folder

4. Run node server 

`node petStagram.js`

5. Server will be running on port 8000

## Dev Modes
1. Debugging log  
set `var debug = true` in line 26 petStagram.js

2. Using local database  
set `var localDB = true` in line 27 petStagram.js

3. Sample database initializing  
set `var sampleDB = true` in line 28 petStagram.js 

## URL introduction  
JSON format http request available
GET/POST/PUT/DELETE

[**CAUTION**]  
The reponse value doesn't have double quotation mark("") except String value  
However, request MUST have it for all key & value   
Notation(opt) means it is optional input   

### /login  
- [POST]  
  request body  
  {  
    "email" : "example@petstagram.com",  
    "password" : "example"  
  }  
  
- response  
  {  
    "token" : "90kadjkf1la0aj3k2aopsdfp"  
   }  
  
### /register  
- [POST]  
  request body  
  {  
    "email" : "example@petstagram.com",  
    "password" : "example",  
    "username" : "example",
    "userProfileImage"(opt) : "www.example.com/pic",
    "userIntroduceText"(opt) : "hello, world!",
    "petName" : "example"
    "petProfileImage"(opt) : "www.example.com/pic",
    "petIntroduceText"(opt) : "hello, world!"
  }  
  
- response  
  {  
      "user_id" : 123,  
      "pet_id" : 231,  
      "success" : true  
  }  
  
### /user/:user_id  
- [GET]  
  /user/123  
  
- response  
  {  
      "user_id" : 123,  
      "email" : "example@petstagram.com",  
      "username" : "example",  
      "userProfileImage" : "www.example.com/pic",  
      "introduceText" : "hello world",  
      "pet_id" : 231,    
      "userBirthDay" : YYYYMMDD,  
      "totalPost" : 3,  
      "totalFollowing" : 217,  
      "totalFollowed" : 102,  
      "followingNames" : ["James", "Sally", "Hong"]  
  }  

- [PUT]  
  /user/123  
  
- request body  
  {  
      "userEmail"(opt) : "example@petstagram.com",  
      "password"(opt) : "example",  
      "username"(opt) : "example",  
      "userProfileImage"(opt) : "www~",  
      "introduceText"(opt) : "hello, world!"  
  }  
  
- response  
  {  
      "success" : True  
  }  

- [DELETE]  
  /user/123  
  
- request body  
  {  
      "userEmail" : "example@example.com"  
  }  
  
- response  
  {  
      "success" : True  
  }  
    
### /user  
- [GET]  
  /user?userEmail=example@example.com  
  
- response  
  {  
      "userProfileImage" : "www.example.com/pic",  
      "userEmail" : "example@petstagram.com",  
      "introduceText" : "hello world"  
  }  
  
### /userFilter  
for auto completion
- [GET]  
  /userFilter?userEmail=ex  
  
- response  
  {  
      "num" : 3,  
      "result" : ["example", "example1", "example3"]  
  }  
  
### /follow
user1 -> user2  
- [POST]  
  /follow  
  
- request body  
  {  
      "userEmail1" : "example1@petstagram.com",  
      "userEmail2" : "example2@petstagram.com"  
  }  
  
- response  
  {  
      "success" : True  
  }  
  
### /unfollow  
- [POST]   
  /unfollow  
  
- request body  
  {  
      "userEmail1" : "example1@petstagram.com",  
      "userEmail2" : "example2@petstagram.com"  
  }  
  
- response  
  {  
      "success" : True  
  }  
  
### /pet  
- [GET]  
  /pet?id=231  
  
- response  
  {  
      "petProfileImage" : "www.example.com/pic",  
      "petName" : "examplePet" 
  }  
  
- [POST]  
  request body  
  {  
      "petName" : "examplePet",
      "petProfileImage"(opt) : "www.~",
      "petBirthDay"(opt) : YYYYMMDD,
      "introduceText"(opt) : "hello, world!",
      "owner" : ["example1@petstagram.com","example2@petstagram.com"]
  }  
  
- response  
  {  
      "pet_id" : 231,  
      "success" : True  
  }  

### /pet/:pet_id  
- [GET]  
  /pet/231  
  {  
      "id" : 231,  
      "petName" : "examplePet",  
      "petProfileImage" : "www.~",  
      "petBirthDay" : YYYYMMDD,  
      "introduceText" : "hello, world!",  
      "owner" : ["example1@petstagram.com", "example2@petstagram.com"]  
  }  
  
- [PUT]  
  /pet/231  

- request body
  {  
      "petName" : "examplePet",  
      "petProfileImage" : "www.~",  
      "petBirthDay" : YYYYMMDD,  
      "introduceText" : "hello, world!"  
  }  
  
- response  
  {  
      "success" : True  
  }  
  
- [DELETE]   
  /pet/231  
  
- response  
  {  
      "success" : True  
  }  
  
## /pet/addOwner/:pet_id  
- [POST]  
  /pet/addOwner/231  
  
- request body  
  {  
      "newOwner" : "example@petstagram.com"  
  }  
  
- response  
  {  
      "success" : True  
  }  
  
## /pet/deleteOwner/:pet_id  
Same as /pet/addOwner/:pet_id  
  
## /userPet/:userEmail  
get all information of user's pets  
- [GET]  
  /userPet/11  
  
- response  
  {  
      "pets" : [{pet1 info}, {pet2 info}, ... ]  
  }  
  
## /card
- [POST]  
- request body  
  {  
      "title" : "hi",  
      "text" : "blah blah",  
      "pet_id" : "231",  
      "tag" : "["pet","star","gram"]",  
      "picture" : "["www.~","www.~","www.~"]",  
      "video" : "["www.~","www.~","www.~"]",  
      "location" : "123,456"  
  }  
  
- response  
  {  
      "success" : True"  
  }  
  
## /card/:card_id  
- [GET]  
- response  
  {  
      "id" : 555,  
      "title" : "hi",  
      "text" : "blah blah",  
      "tag_id" : [123, 456],  
      "picture_id" : [1234, 5678],  
      "video_id" : [12, 34],  
      "comment_id" : [12456, 7890],  
      "date" : YYYYMMDD,  
      "pet_id" : 231,  
      "location" : "123, 456"  
  }  
  
- [PUT]  
- request  
"title", "text", "tag", "picture", "video", "location"  
  
- [DELETE]  
  /card/231  
  
## /comment  
- [POST]  
- request body  
  {  
      "text" : "hello",  
      "userEmail" : "example@petstagram.com"  
  }  
  
## /comment/:comment_id  
- [GET]  
  {  
      "id" : 231,  
      "text" : "hello",  
      "date" : YYYYMMDD,  
      "userEmail" : "example@petstagram.com",  
      "card_id" : 23  
  }  
  
- [PUT]  
- request  
"text", "userEmail", "card_id"  
  
- [DELETE]  
  /comment/231  
  
## /like  
- [POST]  
- request body  
  {  
      "userEmail" : "example@petstagram.com",  
      "card_id" : 23  
  }  
  
## /like/:like_id  
- [DELETE]  
  /like/231  
  

  
