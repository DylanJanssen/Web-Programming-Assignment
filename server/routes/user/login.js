module.exports = function (app, db, collectionName, read) {
    // route for a user login
    app.post('/login', async (req, res) => {
        
        const query = {'username': req.body.username}

        // check if username exists
        const user = await read.itemExists(db, collectionName, query) 
        if (user === null) {
            res.send({success: false })
        }
        else if (user.password === req.body.password) {
            const userString = JSON.stringify(user)
            res.send({ success: true, user: userString })
        }
        else {
            res.send({success: false})
        }
    })
}