const mongodb = require('mongodb')

module.exports = function (app, db, collectionName, update) {
    app.post('/updateUser/:_id', async (req, res) => {
        const query = { _id: new mongodb.ObjectID(req.params._id) }

        const newValues = {
            $set:
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                rank: req.body.rank
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