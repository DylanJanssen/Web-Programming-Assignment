const mongodb = require('mongodb')

module.exports = function (app, db, collectionName, remove) {
    app.delete('/removeGroup/:_id', async (req, res) => {
        const delQuery = { _id: new mongodb.ObjectID(req.params._id) }
        const delChannelQuery = { groupId: req.params._id}
        try {
            await remove.item(db, collectionName, delQuery)
            await remove.items(db, 'Channels', delChannelQuery)
            res.send({ success: true })
        }
        catch (error) {
            console.log(error)
            res.send({ success: false })
        }
    })
}