const express = require('express');
const app = express();
const http = require('http').Server(app);
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../dist/chat-app/')));

require('./routes/authUser.js')(app, fs);
require('./routes/addUser.js')(app, fs);
require('./routes/getUser.js')(app, fs);

require('./routes/updateUser.js')(app, fs);
require('./listen.js')(http);

app.get('/getUsers', (req, res) => {
    fs.readFile('users.json', 'utf8', function(err, data){
        if (err){
            console.log(err);
        }
        else{
            const users = JSON.parse(data);
            res.send(users);
        }
    });
});