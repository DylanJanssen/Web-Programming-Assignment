module.exports = function(app, fs){
    // route to manage user logins
    app.get('/getUser', (req, res) => {
        const username = req.query.username;

        fs.readFile('users.json', 'utf8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);
                const user = users.filter(user => user.username === username);
                if (user.length != 0)
                    res.send(user);
                else 
                    res.send({'success':false});
            }
        });
    });
}