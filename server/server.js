const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../dist/chat-app/')));

// routes for user services
require('./routes/user/getUser.js')(app, fs);
require('./routes/user/updateUser.js')(app, fs);
require('./routes/user/deleteUser.js')(app, fs);

// routes for group services
require('./routes/group/getGroups.js')(app, fs);
require('./routes/group/addGroup.js')(app, fs);
require('./routes/group/deleteGroup.js')(app, fs);


require('./routes/getChannels.js')(app, fs);
require('./routes/getChannel.js')(app, fs);
require('./listen.js')(http);

