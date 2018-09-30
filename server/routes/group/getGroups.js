module.exports = function (app, db, collectionName, read) {
    // route to retrieve all groups
    app.get('/getGroups', async (req, res) => {
        try {
            const groups = await read.items(db, collectionName)
            const groupsString = JSON.stringify(groups)
            res.send({ success: true, groups: groupsString })
        }
        catch (err) {
            console.log(err)
            res.send({ success: false })
        }
    })
}
