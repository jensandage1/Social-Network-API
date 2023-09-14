# Social-Network-API


## Description:
    This code  is the backend portion of a social media app which can add and modify users and their friends.  

## Table of Contents:
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation
You need to install express and mongoose. Do this by typing in your terminal "npm install mongoose" and "npm install express".  

## Usage
This app is currently back end only, so first you must "npm init" then you  must start the server with "node index.js". You can view the data throug Insomnia or a similar program. Start a new http request.

To view and manipulate users and their friends: 

http://localhost:3001/api/users
GET request will retrieve all users
POST request with a JSON body containing a username and email address will create a new user. 

http://localhost:3001/api/users/:userId
GET request will get a single user with that id.
PUT request with modified JSON information will update a user
DELETE request will delete the user with that id

http://localhost:3001/api/users/:userId/friends/:friendId
POST request will add a friend to the user. 
DELETE request will delete a friend from the user. 

To view and manipulate thoughts and reactions (like posts and comments):

http://localhost:3001/api/thoughts
GET request will retrieve all thoughts
POST request with JSON body containing the thoughtText and username will post a new thought

http://localhost:3001/api/thoughts/:thoughtId
GET request will retrieve that specific thought.
PUT request with the updated JSON body will update a thought.
DELETE request will delete the thought.

http://localhost:3001/api/thoughts/:thoughtId/reactions
POST request will post a reaction(like a comment) to a thought.

http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
DELETE request will delete the reaction from a thought. 

## Credits

## License  

## Tests


## Questions

github repo:
https://github.com/jensandage1/Social-Network-API

 Video Showing Userability:
 https://watch.screencastify.com/v/VNUkObJpKqGisw7OTOOa

![screenshot of Insomnia showing all current thoughts](<utils/Screenshot 2023-09-11 123805.png>)![screenshot of Insomnia showing all current users](<utils/Screenshot 2023-09-11 123819.png>)