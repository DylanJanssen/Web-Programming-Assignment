module.exports = function(app, fs){
    // route to retrieve user groups
    app.get('/getGroups/:username', (req, res) => {
        const username = req.params.username;

        fs.readFile('groups.json', 'utf8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const groups = JSON.parse(data);
                const userGroups = groups.filter(group => group.users.includes(username));
                res.send(userGroups);
            }
        });
    });
}
