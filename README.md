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

[CAUTION]
The reponse value doesn't have double quotation mark("") except String value  
However, request MUST have it for all key & value   

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
    "petName" : "example"  
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
      "card_id" : [93812, 102933, 123828],  
      "userBirthDay" : YYYYMMDD,  
      "totalPost" : 3,  
      "totalFollowing" : 217,  
      "totalFollowed" : 102,  
      "followingNames" : ["James", "Sally", "Hong"]  
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
- [GET]  
  /userFilter?userEmail=ex  
  
- reponse  
  {  
      "num" : 3,  
      "result" : ["example", "example1", "example3"]  
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
      "petName" : "examplePet"  
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
      "pet_id" : 231,  
      "petName" : "examplePet"  
  }  
  

  
