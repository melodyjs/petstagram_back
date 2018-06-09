# petstagram_back
Web site
petstagram backend code

Node.js used

## Usage
1. Install node.js and express

2. Download server file from github

`git clone https://github.com/melodyjs/petstagram_back.git`

3. Move to nodeServer folder

4. Run node server 

`node petStagram.js`

5. Server will be running on port 3000

## URL introduction  
JSON format http request available
GET/POST/PUT/DELETE

[CAUTION]
The reponse doesn't have double quotation mark("")
However, Request MUST have it. 

### /login  
- [POST]  
  body  
  `{  
    "email" : "example@petstagram.com",  
    "password" : "example"  
  }'  
  
- response  
  `{  
    token : 90kadjkf1la0aj3k2aopsdfp  
   }`  
  
### /register  
- [POST]  
  body  
  `{  
    "email" : "example@petstagram.com",  
    "password" : "example",  
    "username" : "example",  
    "petName" : "example"  
  }`  
  
- respose  
  `{  
      user_id : 123,  
      pet_id : 231,  
      success : true  
  }`  
  
### /user/:user_id  
- [GET]  
  /user/123  
  
- response  
  '{  
      user_id : 123,  
      email : example@petstagram.com,  
      username : example,  
      userProfileImage : www.example.com/pic,  
      introduceText : hello world,  
      pet_id : 231,  
      card_id : [93812, 102933, 123828],  
      userBirthDay : YYYYMMDD,  
      totalPost : 3,  
      totalFollowing : 217,  
      totalFollowed : 102,  
      followingNames : [James, Sally, Hong]  
  }`  
  
### /user  
- [GET]  
  /user?userEmail=example@example.com  
  
- response  
  `{  
      userProfileImage : www.example.com/pic,  
      userEmail : example@petstagram.com,  
      introduceText : hello world  
  }`  
  
### /userFilter  
- [GET]  
  /userFilter?userEmail=ex  
  
- reponse  
  `{  
      num : 3,  
      result : [example, example1, example3]  
  }`  
  
### /pet  
- [GET]  
  /pet?id=231  
  
- response  
  `{  
      petProfileImage : www.example.com/pic,  
      petName : examplePet  
  }`  
  
- [POST]  
  body  
  `{  
      "petName" : "examplePet"  
  }`  
  
- response  
  `{  
      pet_id : 231,  
      success : true  
  }`  

### /pet/:pet_id  
- [GET]  
  /pet/231  
  `{  
      pet_id : 231,  
      petName : examplePet  
  }`  
  

  
