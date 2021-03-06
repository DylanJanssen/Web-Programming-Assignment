const mongodb = require('mongodb')

module.exports = function (app, db, collectionName, read) {
    // route to retrieve all groups
    app.get('/getUserGroupChannels/:groupId/:userId', async (req, res) => {
 
        const query = { groupId: req.params.groupId, userIds: req.params.userId }
        try {
            const channels = await read.findItems(db, collectionName, query)
            const channelsString = JSON.stringify(channels)
            res.send({ success: true, channels: channelsString })
        }
        catch (err) {
            console.log(err)
            res.send({ success: false })
        }
    })
}