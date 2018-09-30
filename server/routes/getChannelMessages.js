module.exports = function (app, db, collectionName, read) {
    // route to retrieve all groups
    app.get('/getChannelMessages/:channelId', async (req, res) => {
        const query = {channelId: req.params.channelId }

        try {
            const messages = await read.findItems(db, collectionName, query)
            res.send({ success: true, messages: messages })
        }
        catch (err) {
            console.log(err)
            res.send({ success: false })
        }
    })
}
