module.exports = async function(app, io, db, collectionName, create, read){
    
    console.log("Server Socket Initialised");
    // respond to connection request
    io.on('connection', socket => {
        
        console.log('user connection')
        socket.on('enter-channel', request => {
            channelId = request.channelId
            username = request.username
            socket.join(channelId)

            const message = {
                message: '[SERVER] ' + username + ' has connected',
                channelId: channelId,
                userId: null,
                type: 'text',
                timestamp: Date.now(),
                photoId: null
            }

            io.in(channelId).emit('message', message)
        })

        // respond to disconnect request
        socket.on('disconnect', request => {
            console.log('user disconnection')
            const message = {
                message: '[SERVER] ' + username + ' has disconnected',
                channelId: channelId,
                userId: null,
                type: 'text',
                timestamp: Date.now(),
                photoId: null
            }
            io.in(channelId).emit('message', message)
        })

        // respond to getting a new message
        socket.on('add-message', async message => {
            console.log(message)
            // insert the message into the database
            try {
                await create.item(db, collectionName, [message])
            }
            catch (error) {
                console.log(error)
            }
            
            // broadcast the message to all users that are subscribed to this socket
            io.in(channelId).emit('message', message)
        })
    })
}
