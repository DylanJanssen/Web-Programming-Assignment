const mongodb = require('mongodb')

module.exports = function (app, db, collectionName, remove) {
    // route for removing a user
    app.delete('/removeUser/:_id', async (req, res) => {
        const delQuery = { _id: new mongodb.ObjectID(req.params._id) }
        try {
            await remove.item(db, collectionName, delQuery)
            res.send({ success: true })
        }
        catch (error) {
            console.log(error)
            res.send({ success: false })
        }
    })
}