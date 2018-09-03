module.exports = function (app, fs) {
    // route to manage user logins
    app.get('/getUser/:username', (req, res) => {
        const username = req.params.username;

        fs.readFile('users.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                const users = JSON.parse(data);
                const user = users.find(user => user.username === username);
                if (user != null)
                    // send back the user
                    res.send(user);
                else {
                    // add the user to the file
                    const newUser = {
                        'username': username,
                        'email': '',
                        'rank': 'User'
                    };
                    users.push(newUser);
                    const postAdd = JSON.stringify(users);
                    fs.writeFile('users.json', postAdd, 'utf-8', function (err) {
                        if (err) throw err;
                        // send back the newly created user
                        res.send(newUser);
                    });
                }
            }
        });
    });
}
