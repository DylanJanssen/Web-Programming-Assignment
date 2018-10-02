module.exports = function (app, db, collectionName, create, read) {
    // route for creating a user 
    app.post('/createUser', async (req, res) => {
        
        const user = [
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                rank: req.body.rank,
                image: 'default.jpg'
            }
        ]
        const query = {'username': req.body.username}

        // Check if the username already exists 
        if (await read.itemExists(db, collectionName, query) != null) {
            res.send({ success: false })
        }
        // Otherwise create a new user
        else {
            try {
                await create.item(db, collectionName, user)
                res.send({ success: true })
            }
            catch (error) {
                console.log(error)
                res.send({ success: false })
            }
        }
        
    })
}