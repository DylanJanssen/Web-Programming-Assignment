const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../dist/chat-app/')));

// routes for user services
require('./routes/user/getUser.js')(app, fs);       // get / create a user
require('./routes/user/getUsers.js')(app, fs);      // get all users
require('./routes/user/updateUser.js')(app, fs);    // update a user
require('./routes/user/deleteUser.js')(app, fs);    // delete a user
require('./routes/user/getGroups.js')(app, fs);     // get groups that user is in
require('./routes/user/getChannels.js')(app, fs);   // of a group get channels that a user is in

// routes for group services
require('./routes/group/addGroup.js')(app, fs);     // add a group
require('./routes/group/deleteGroup.js')(app, fs);  // delete a group

// routes for channel services 
require('./routes/channel/getChannel.js')(app, fs);     // get a channel given the name
require('./routes/channel/addChannel.js')(app, fs);     // add a channel to the given group
require('./routes/channel/deleteChannelUser.js')(app, fs);  // delete a user from the channel
require('./routes/channel/addChannelUser.js')(app, fs);     // add a user to the channel
require('./routes/channel/deleteChannel.js')(app, fs);      // delete the channel

require('./listen.js')(http);

