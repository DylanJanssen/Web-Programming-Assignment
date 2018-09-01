module.exports = function(app, fs){
    app.post('/addUser', (req, res) => {
        const username = req.query.username;

        fs.readFile('users.json', 'utf-8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);

                if (users.some(user => user.username === username)){
                    res.send({'username':username, 'success':false});
                }
                else{
                    // add the username to the file
                    users.push({'username':username});
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