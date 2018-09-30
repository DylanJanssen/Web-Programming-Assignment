module.exports = function (app, db, collectionName, read) {
    // route to retrieve all users
    app.get('/getUsers', async (req, res) => {
        try {
            const users = await read.items(db, collectionName)
            const usersString = JSON.stringify(users)
            res.send({ success: true, users: usersString })
        }
        catch (err) {
            constole.log(err)
            res.send({ success: false })
        }
    })
}
