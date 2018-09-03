module.exports = function(app, fs){
    // route to retrieve user groups
    app.get('/getGroups/:username', (req, res) => {
        const username = req.params.username;
        let admin;

        // First check if the user is an admin
        fs.readFile('users.json', 'utf8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const users = JSON.parse(data);
                user = users.find(user => user.username === username);
                console.log(user);
                if (user.rank === 'Super' || user.rank === 'Group'){
                    admin = true;
                }
                // Now get the groups the user is in
                fs.readFile('groups.json', 'utf8', function(err, data){
                    if (err){
                        console.log(err);
                    }
                    else{
                        const groups = JSON.parse(data);
                        // If the user is an admin, just send them all the groups
                        if (admin){
                            res.send(groups);
                        }
                        // Otherwise filter out the groups the user is in 
                        else{
                            const userGroups = groups.filter(group => group.users.includes(username));
                            res.send(userGroups);
                        }                        
                    }
                });
            }
        })
        
    });
}
