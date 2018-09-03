module.exports = function (app, fs) {
    app.post('/addGroup', (req, res) => {
        const name = req.body.name;
        const desc = req.body.desc;
        const users = req.body.users;

        fs.readFile('groups.json', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                const groups = JSON.parse(data);
                // check that the group does not already exist
                if (groups.some(group => group.name === name)) {
                    res.send({ 'name': name, 'success': false });
                }
                else {
                    // add the group to the file
                    const group = {
                        'name': name,
                        'desc': desc,
                        'users': users
                    }
                    groups.push(group);
                    const postAdd = JSON.stringify(groups);
                    fs.writeFile('groups.json', postAdd, 'utf-8', function (err) {
                        if (err) throw err;
                        res.send();
                    });
                }
            }
        });
    });
}

