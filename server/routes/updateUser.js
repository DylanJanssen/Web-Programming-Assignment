module.exports = function(app, fs){
    app.post('/updateUser', (req, res) => {
        const username = req.query.username;
        const email = req.query.email;
        const rank = req.query.rank;

        fs.readFile('users.json', 'utf-8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);
                const user = users.filter(user => user.username === username);
                if (user.length != 0){
                    user.email = email;
                    user.rank = rank;
                    const postUpdate = JSON.stringify(users);
                    fs.writeFile('users.json', postUpdate, 'utf-8', function(err){
                        if (err) throw err;
                        // send response that update was successful
                        res.send({'username':username, 'success':true});
                    });
                }
                else 
                    res.send({'success':false});                
            }
        });
    });
}