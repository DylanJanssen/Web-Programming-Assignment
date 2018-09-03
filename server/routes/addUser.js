module.exports = function(app, fs){
    app.post('/addUser', (req, res) => {
        const username = req.body.username;
        const email = req.body.email;
        const rank = req.body.rank;
        
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
                    const user = {
                        "username":username, 
                        "email":email, 
                        "rank":rank
                    }
                    // add the username to the file
                    users.push(user);                    
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

