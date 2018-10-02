# Chat App - Web Programming Assignment

This repository contains a server and front end for a chat system. The chat system allows users to communicate with each other in real tile in different groups and channels. Implemented using the MEAN stack (MongoDB, Express.js, Angular, Node.js) and Socket.IO.


## Front End Angular App
- To build the front-end use `ng build`
- The server will serve the built application

## Server
- To start the server run `node server/server.js`

## Repository Organization
The Angular source is stored within the /src folder and the server source is stored within the /server folder. An /images folder is required at the root directory for user uploaded images to be stored to. 

## Git Usage
Throughout developed when large changes were made and working, they would be committed and pushed to gitHub. 

## Data Structures
Users, Groups, Channels and Messages were each stored as separate objects with the following layout. 
Each object utilises a mongoDB generated _id for unique identification.
- __User__
  - _id: ObjectId(\<hexadecimal>)
  - username: string
  - rank: string
  - email: string
  - image: string
  
- __Group__
  - _id: ObjectId(\<hexadecimal>)
  - name: string
  - userIds: List\<ObjectId(\<hexadecimal>)>
  
- __Channel__ 
  - _id: ObjectId(\<hexadecimal>)
  - groupId: ObjectId(\<hexadecimal>)
  - userIds: List\<ObjectId(\<hexadecimal>)>
  
- __Message__
  - _id: ObjectId(\<hexadecimal>)
  - message: string
  - channelId: ObjectId(\<hexadecimal>)
  - userId: ObjectId(\<hexadecimal>)
  - type: string
  - timestamp: number
  - image: boolean

## Separation of Responsibilities - REST API and Client
A REST API was developed in Node.js for the server, which was able to retain its state using data stored in a MongoDB database collections during and between sessions. The client side, using the Angular Framework, could easily send, request and receive
data in a predetermined structure thanks to the RESTful API. As the frontend/back-end communication occurred asynchronously, the application was able to update in real time to display changes for the user

## Routes
### Users:

##### GET: '/getUsers'
- __Description:__ 
  - Route for retrieving all users
- __Parameters:__ 
	- none
- __Return value:__ 
  - success: boolean
  - users: list\<user> (if success === true) 

##### POST: '/login'
- __Description:__ 
  - Route for a user logging in
- __Parameters:__ 
  - username: string
  - password: string
- __Return value:__ 
  - success: boolean
  - user: userObject (if success === true) 

##### POST: '/createUser'
- __Description:__ 
  - Route for a creating a new user
- __Parameters:__ 
  - username: string
  - password: string
  - email: string
  - rank: string
  - image: string
- __Return value:__ 
  - success: boolean

##### POST: '/updateUser'
- __Description:__ 
  - Route for updating a user
- __Parameters:__ 
- - \_id: ObjectId(\<hexadecimal>)
  - username: string
  - password: string
  - email: string
  - rank: string
  - image: string
- __Return value:__ 
  - success: boolean

##### DELETE: '/removeUser/:id'
- __Description:__ 
  - Route for deleting a user
- __Parameters:__ 
- - id: ObjectId(\<hexadecimal>)
- __Return value:__ 
  - success: boolean

### Groups:

##### GET: '/getGroups'
- __Description:__ 
  - Route for retrieving all groups
- __Parameters:__ 
	- none
- __Return value:__ 
  - success: boolean
  - groups: list\<group> (if success === true) 

##### GET: '/getUserGroups/:userId'
- __Description:__ 
  - Route for retrieving all groups that a user is in
- __Parameters:__ 
	- userId: ObjectId(\<hexadecimal>)
- __Return value:__ 
  - success: boolean
  - groups: list\<group> (if success === true) 

##### POST: '/createGroup'
- __Description:__ 
  - Route for a creating a new group
- __Parameters:__ 
  - name: String
  - userIds: list\<ObjectId(\<hexadecimal>)>
- __Return value:__ 
  - success: boolean

##### POST: '/updateGroup'
- __Description:__ 
  - Route for updating a group
- __Parameters:__ 
- - \_id: ObjectId(\<hexadecimal>)
  - name: String
  - userIds: list\<ObjectId(\<hexadecimal>)>
- __Return value:__ 
  - success: boolean

##### DELETE: '/removeGroup/:id'
- __Description:__ 
  - Route for deleting a group
- __Parameters:__ 
- - id: ObjectId(\<hexadecimal>)
- __Return value:__ 
  - success: boolean


### Channels:

##### GET: '/getChannels'
- __Description:__ 
  - Route for retrieving all channels
- __Parameters:__ 
	- none
- __Return value:__ 
  - success: boolean
  - channels: list\<channel> (if success === true) 

##### GET: '/getUserGroupChannels/:groupId/:userId'
- __Description:__ 
  - Route for retrieving all channels that a user is in
- __Parameters:__ 
  - groupId: ObjectId(\<hexadecimal>)
  - userId: ObjectId(\<hexadecimal>)
- __Return value:__ 
  - success: boolean
  - channels: list\<channel> (if success === true) 

##### POST: '/createChannel'
- __Description:__ 
  - Route for a creating a new channel
- __Parameters:__ 
  - name: String
  - groupId: ObjectId(\<hexadecimal>)
  - userIds: list\<ObjectId(\<hexadecimal>)>
- __Return value:__ 
  - success: boolean

##### POST: '/updateChannel'
- __Description:__ 
  - Route for updating a channel
- __Parameters:__ 
- - \_id: ObjectId(\<hexadecimal>)
  - name: String
  - groupId: ObjectId(\<hexadecimal>)
  - userIds: list\<ObjectId(\<hexadecimal>)>
- __Return value:__ 
  - success: boolean

##### DELETE: '/removeChannel/:id'
- __Description:__ 
  - Route for deleting a channel
- __Parameters:__ 
- - id: ObjectId(\<hexadecimal>)
- __Return value:__ 
  - success: boolean

### Messages:

##### GET: '/getChannelMessages/:channelId'
- __Description:__ 
  - Route for retrieving all messages for a channel
- __Parameters:__ 
  - channelId: ObjectId(\<hexadecimal>)
- __Return value:__ 
  - success: boolean
  - messages: list\<message> (if success === true) 


### Components

- __Login__ | Contains a login form for the user to login to the application

- __New-Dashboard__ | Component that the user is routed to once they have successfully logged in. 
  - __Menu__
    - __Upload Avatar Dialog__ | opens dialog which allows the user to upload an avatar for their account 
    - __Create New User Dialog__ | visible for Super admins that opens a dialog to create a new user
    - __logout__ | Allows the user to logout of the session
  - __Groups__ | List of groups that the user is in, on click opens a nested group component 
  - __Admin__ | visible for Group and Super admins, opens nested admin component
  
- __New-Group__ | Component containing a group
  - __Channels__ | List of channels that the user is in, on click opens a nested channel component 
  - __Delete Group__ | visible for Group and Super admins to delete the currently active group 
- __New-Channel__ | Component containing the chat interface
- __Admin__ | Component to change ranking of users

### Services
These are the services that call the REST API from Angular
- __User Service__
  - Responsibilities 
    - login user
    - create user
    - remove user
    - get users
    - update user

- __Group Service__
  - Responsibilities
    - get groups
    - get user groups
    - create group
    - remove group
    - update group
   
- __Channel Service__
  - Responsibilities
    - get channels
    - get user group channels
    - create channel
    - remove channel
    - update channel

- __Img Upload Service__
  - Responsibilities
    - img upload


- __Socket Service__
  - Responsibilities
    - join channel
    - disconnect channel
    - send message
    - get messages
    - get channel messages
