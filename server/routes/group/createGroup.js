module.exports = function (app, db, collectionName, create, read) {
    app.post('/createGroup', async (req, res) => {
        
        const group = [
            {
                name: req.body.name,
                userIds: req.body.userIds
            }
        ]
        const query = {'name': req.body.name}

        // Check if the group already exists 
        if (await read.itemExists(db, collectionName, query) != null) {
            res.send({ success: false })
        }
        // Otherwise create a new group
        else {
            try {
                await create.item(db, collectionName, group)
                res.send({ success: true })
            }
            catch (error) {
                console.log(error)
                res.send({ success: false })
            }
        }
    })
}