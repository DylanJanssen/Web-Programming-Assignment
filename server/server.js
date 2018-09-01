const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, '../dist/chat-app/')));

require('./routes/authUser.js')(app, fs);
require('./routes/addUser.js')(app, fs);
require('./routes/getUser.js')(app, fs);
require('./routes/updateUser.js')(app, fs);
require('./listen.js')(http);
