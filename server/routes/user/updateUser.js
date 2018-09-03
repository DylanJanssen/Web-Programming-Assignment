module.exports = function(app, fs){
    app.post('/updateUser/:username', (req, res) => {
        const username = req.params.username;
        
        fs.readFile('users.json', 'utf-8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);
                users.filter(user => {
                    if (user.username === username && user.username != 'Super'){
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