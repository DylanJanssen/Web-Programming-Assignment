module.exports = function (app, db, collectionName, read) {
    // route to retrieve all channels
    app.get('/getChannels', async (req, res) => {
        try {
            const channels = await read.items(db, collectionName)
            const channelsString = JSON.stringify(channels)
            res.send({ success: true, groups: channelsString })
        }
        catch (err) {
            constole.log(err)
            res.send({ success: false })
        }
    })
}
