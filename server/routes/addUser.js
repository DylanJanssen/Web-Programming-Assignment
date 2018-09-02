module.exports = function(app, fs){
    app.post('/addUser', (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const rank = req.body.rank;
        console.log(username);
        fs.readFile('users.json', 'utf-8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);
                // check that the user does not already exist
                if (users.some(user => user.username === username)){
                    res.send({'username':username, 'success':false});
                }
                else{
                    let id = Math.max.apply(Math, users.map(function(f){return f.id;})) + 1;
                    // add the username to the file
                    users.push({'id':id, 'username':username, "email":email, "rank":rank });                    
                    const postAdd = JSON.stringify(users);
                    fs.writeFile('users.json', postAdd, 'utf-8', function(err){
                        if (err) throw err;
                        // send response that registration was successful
                        res.send({'username':username, 'success':true});
                    });
                }                
            }
        });
    });
}

