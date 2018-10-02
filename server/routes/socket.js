module.exports = async function (app, io, db, collectionName, create, read) {
    // socket.io implementation for the messaging sevice
    console.log("Server Socket Initialised");

    // respond to connection request
    io.on('connection', socket => {
        console.log('user connection')
        socket.on('enter-channel', request => {
            channelId = request.channelId
            username = request.username
            socket.join(channelId)
        })

        // respond to disconnect request
        socket.on('disconnect', request => {
            console.log('user disconnection')
        })

        // respond to getting a new message
        socket.on('add-message', async message => {
            if (message.userId != '0') {
                // insert the message into the database
                try {
                    await create.item(db, collectionName, [message])
                }
                catch (error) {
                    console.log(error)
                }
            }
            // broadcast the message to all users that are subscribed to this socket
            io.in(channelId).emit('message', message)
        })
    })
}