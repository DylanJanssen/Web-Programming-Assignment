module.exports = function (app, fs) {
    app.post('/addChannel/:groupname/:channelname/:username', (req, res) => {
        const username = req.params.username;
        const groupname = req.params.groupname;
        const channelname = req.params.channelname;

        console.log(req.body);
        fs.readFile('channels.json', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                const channels = JSON.parse(data);
                // check that the channel does not already exist
                if (channels.some(channel => channel.name === channelname)) {
                    res.send();
                }
                else {
                    // add the group to the file
                    const channel = {
                        'name': channelname,
                        'group': groupname,
                        'users': [username]
                    }
                    channels.push(channel);
                    const postAdd = JSON.stringify(channels);
                    fs.writeFile('channels.json', postAdd, 'utf-8', function (err) {
                        if (err) throw err;
                        res.send();
                    });
                }
            }
        });
    });
}
