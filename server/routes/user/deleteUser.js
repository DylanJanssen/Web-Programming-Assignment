module.exports = function(app, fs){
    // route to delete a user
    app.delete('/deleteUser/:username', (req, res) => {
        const username = req.params.username;
        
        // not allowed to delete Super
        if (username === 'Super'){
            res.send();
        }
        else{
            fs.readFile('users.json', 'utf8', function(err, data){
                if (err){
                    console.log(err);
                }
                else{
                    const users = JSON.parse(data);
                    const postRemove = JSON.stringify(users.filter(user => user.username != username));
                    fs.writeFile('users.json', postRemove, 'utf-8', function(err){
                        if (err) throw err;
                        res.send();
                    });
                }
            });
        }        
    });
}