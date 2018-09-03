module.exports = function (app, fs) {
    // route to retrieve all users
    app.get('/getUsers', (req, res) => {
        fs.readFile('users.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                const users = JSON.parse(data);
                res.send(users);
            }
        });
    });
}
