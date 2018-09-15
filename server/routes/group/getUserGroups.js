const mongodb = require('mongodb')

module.exports = function (app, db, collectionName, read) {
    // route to retrieve all groups
    app.get('/getUserGroups/:userId', async (req, res) => {
 
        const query = { userIds: req.params.userId }
        console.log(query)
        try {
            const groups = await read.findItems(db, collectionName, query)
            const groupsString = JSON.stringify(groups)
            console.log(groupsString)
            res.send({ success: true, groups: groupsString })
        }
        catch (err) {
            console.log(err)
            res.send({ success: false })
        }
    })
}