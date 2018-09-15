module.exports = function (app, db, collectionName, read) {
    // route to retrieve all groups
    app.get('/getGroups', async (req, res) => {
        try {
            const groups = await read.items(db, collectionName)
            const groupsString = JSON.stringify(groups)
            console.log(groupsString)
            res.send({ success: true, groups: groupsString })
        }
        catch (err) {
            constole.log(err)
            res.send({ success: false })
        }
    })
}
