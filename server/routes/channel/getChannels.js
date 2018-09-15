module.exports = function (app, db, collectionName, read) {
    // route to retrieve all groups
    app.get('/getChannels', async (req, res) => {
        try {
            const channels = await read.items(db, collectionName)
            const channelsString = JSON.stringify(channels)
            console.log(channelsString)
            res.send({ success: true, groups: channelsString })
        }
        catch (err) {
            constole.log(err)
            res.send({ success: false })
        }
    })
}
