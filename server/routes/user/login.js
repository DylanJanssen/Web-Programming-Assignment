module.exports = function (app, db, collectionName, read) {
    app.post('/login', async (req, res) => {
        
        const query = {'username': req.body.username}

        // check if username exists
        const user = await read.itemExists(db, collectionName, query) 
        if (user === null) {
            res.send({success: false })
        }
        else if (user.password === req.body.password) {
            res.send({success: true, username: user.username, email: user.email })
        }
        else {
            res.send({success: false})
        }
    })
}