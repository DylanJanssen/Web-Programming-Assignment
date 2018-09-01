module.exports = function(app, fs){
    // route to manage user logins
    app.get('/authUser', (req, res) => {
        const username = req.query.username;

        fs.readFile('users.json', 'utf8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);

                if (users.some(user => user.username === username)){
                    res.send({'username':username, 'success':true});
                }
                else{
                    res.send({'username':username, 'success':false});
                }
            }
        });
    });
}