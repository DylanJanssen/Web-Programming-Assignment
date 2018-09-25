module.exports = function (app, db, collectionName, create, read) {
    app.post('/createChannel', async (req, res) => {
        
        const channel = [
            {
                name: req.body.name,
                groupId: req.body.groupId,
                userIds: req.body.userIds
            }
        ]
        console.log(req.body.name)
        console.log(req.body.groupId)
        console.log(req.body.userIds)
        const query = {'name': req.body.name, 'groupId': req.body.groupId}

        // Check if the channel already exists in the group
        if (await read.itemExists(db, collectionName, query) != null) {
            res.send({ success: false })
        }
        // Otherwise create a new channel
        else {
            try {
                await create.item(db, collectionName, channel)
                res.send({ success: true })
            }
            catch (error) {
                console.log(error)
                res.send({ success: false })
            }
        }
    })
}