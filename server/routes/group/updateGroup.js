const mongodb = require('mongodb')

module.exports = function (app, db, collectionName, update) {
    // route for updating an existing group
    app.post('/updateGroup', async (req, res) => {
        const query = { _id: new mongodb.ObjectID(req.body._id) }

        const newValues = {
            $set:
            {
                name: req.body.name,
                userIds: req.body.userIds
            }
        }

        try {
            await update.item(db, collectionName, query, newValues)
            res.send({success: true })
        }
        catch (error) {
            console.log(error)
            res.send({success: false })
        }
    })
}