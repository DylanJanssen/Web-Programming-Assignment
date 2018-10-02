// server.js

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const http = require('http').Server(app)
const path = require('path')
// Mongo for database 
const MongoClient = require('mongodb').MongoClient
// io for socket communications
const io = require('socket.io')(http);
// formidable for image uploads
const formidable = require('formidable')

// Import the data access files
const create = require('./data-access/create.js')
const read = require('./data-access/read.js')
const remove = require('./data-access/remove.js')
const update = require('./data-access/update.js')

// Mongo setup
const dbUrl = 'mongodb://localhost:27017'
const dbName = 'chatApp'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../dist/chat-app/')))
app.use(express.json())
// route to alias /images to the /userimages directory
app.use('/images', express.static(path.join(__dirname, '../images')))

// Connect to the server and setup the routes
async function connect() {
    const client = await MongoClient.connect(dbUrl, { useNewUrlParser: true })
    console.log('Successfully connected to the server')
    const db = client.db(dbName)

    // Create the collections    
    await create.collection(db, 'Users')
    await create.collection(db, 'Groups')
    await create.collection(db, 'Channels')
    await create.collection(db, 'ChatMessages')

    // Setup the routes
    await require('./routes/user/createUser.js')(app, db, 'Users', create, read)
    await require('./routes/user/getUsers.js')(app, db, 'Users', read)
    await require('./routes/user/removeUser.js')(app, db, 'Users', remove)
    await require('./routes/user/login.js')(app, db, 'Users', read)
    await require('./routes/user/updateUser.js')(app, db, 'Users', update)

    await require('./routes/group/createGroup.js')(app, db, 'Groups', create, read)
    await require('./routes/group/getGroups.js')(app, db, 'Groups', read)
    await require('./routes/group/getUserGroups.js')(app, db, 'Groups', read)
    await require('./routes/group/removeGroup.js')(app, db, 'Groups', remove)
    await require('./routes/group/updateGroup.js')(app, db, 'Groups', update)

    await require('./routes/channel/createChannel.js')(app, db, 'Channels', create, read)
    await require('./routes/channel/getChannels.js')(app, db, 'Channels', read)
    await require('./routes/channel/getUserGroupChannels.js')(app, db, 'Channels', read)
    await require('./routes/channel/removeChannel.js')(app, db, 'Channels', remove)
    await require('./routes/channel/updateChannel.js')(app, db, 'Channels', update)

    await require('./routes/getChannelMessages.js')(app, db, 'ChatMessages', read)
    await require('./routes/socket.js')(app, io, db, 'ChatMessages', create, read)
    await require('./routes/uploads.js')(app, formidable, db, 'Images', create)

    // Create the super user
    const user = [
        {
            username: 'Super',
            password: 'Super',
            email: 'Super@admin.com',
            rank: 'Super',
            image: 'admin.png'
        }
    ]
    const query = { 'username': 'Super' }
    // check if Super is in the database, if not then add it 
    try {
        if (await read.itemExists(db, 'Users', query) == null) {
            create.item(db, 'Users', user)
        }
    }
    catch (error) {
        console.error(error)
    }
}

require('./listen.js')(http)
connect()
