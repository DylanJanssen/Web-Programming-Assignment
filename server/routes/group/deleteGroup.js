module.exports = function (app, fs) {
    app.delete('/deleteGroup/:name', (req, res) => {
        const name = req.params.name;
        if (name == 'General') {
            res.send();
        }
        else {
            fs.readFile('groups.json', 'utf-8', function (err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    const groups = JSON.parse(data);
                    const postRemove = JSON.stringify(groups.filter(group => group.name != name));
                    fs.writeFile('groups.json', postRemove, 'utf-8', function (err) {
                        if (err) throw err;
                    });

                    // now we need to remove any channels that were in the group
                    fs.readFile('channels.json', 'utf-8', function (err, data) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            const channels = JSON.parse(data);
                            const newChannels = JSON.stringify(channels.filter(channel => channel.group != name));
                            fs.writeFile('channels.json', newChannels, 'utf-8', function (err) {
                                if (err) throw err;
                                res.send();
                            });
                        }
                    });
                }
            });
        }
    });
}

