module.exports = function(app, fs){
    app.post('/addGroup', (req, res) => {
        const name = req.body.name;
        const desc = req.body.desc;
        const users = req.body.users;
        console.log(req.body);
        fs.readFile('groups.json', 'utf-8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const groups = JSON.parse(data);
                // check that the group does not already exist
                if (groups.some(group => group.name === name)){
                    res.send({'name':name, 'success':false});
                }
                else{
                    let id = Math.max.apply(Math, groups.map(function(f){return f.id;})) + 1;
                    // add the group to the file
                    groups.push({'id':id, 'name':name, 'desc':desc, 'users':users });                    
                    const postAdd = JSON.stringify(groups);
                    fs.writeFile('groups.json', postAdd, 'utf-8', function(err){
                        if (err) throw err;
                        // send response that registration was successful
                        res.send({'name':name, 'success':true});
                    });
                }                
            }
        });
    });
}

