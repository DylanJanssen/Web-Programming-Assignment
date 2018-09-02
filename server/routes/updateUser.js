module.exports = function(app, fs){
    app.post('/updateUser/:id', (req, res) => {
        const id = req.params.id;
        console.log(id);
        fs.readFile('users.json', 'utf-8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);
                users.filter(user => {
                    if (user.id == id && id != 1){
                        user.username = req.body.username;
                        user.email = req.body.email;
                        user.rank = req.body.rank;
                    }
                });
                const postUpdate = JSON.stringify(users);
                fs.writeFile('users.json', postUpdate, 'utf-8', function(err){
                    if (err) throw err;
                    // send response that update was successful
                    res.send({'username':req.query.username, 'success':true});
                });
            }
        });
    });
}