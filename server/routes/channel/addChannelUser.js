module.exports = function (app, fs) {
    app.post('/addChannelUser/:group/:channel/:user', (req, res) => {
        const username = req.params.user;
        const groupname = req.params.group;
        const channelname = req.params.channel;

        fs.readFile('channels.json', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                if (username == 'Super')
                    res.send();
                else {
                    const channels = JSON.parse(data);
                    // find the channel
                    let channel = channels.find(channel => channel.name == channelname && channel.group == groupname);
                    // now filter that channel out
                    let newChannels = channels.filter(channel => channel.name != channelname && channel.group != groupname);
                    // check user isn't already in chat 
                    if (channel.users.some(user => user == username)) {
                        res.send();
                    }
                    else {
                        // User is not already in the chat, lets see if they have an account 
                        fs.readFile('users.json', 'utf8', function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                let users = JSON.parse(data);
                                const user = users.find(user => user.username === username);
                                if (user == null) {
                                    // We need to create the user
                                    const newUser = {
                                        'username': username,
                                        'email': '',
                                        'rank': 'User'
                                    };
                                    users.push(newUser);
                                    const postAdd = JSON.stringify(users);
                                    fs.writeFile('users.json', postAdd, 'utf-8', function (err) {
                                        if (err) throw err;
                                    });
                                }
                            }
                        });
                        // Now we need to add the user to the group if they arent already in it
                        fs.readFile('groups.json', 'utf-8', function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            else {
                                let groups = JSON.parse(data);
                                // find the group
                                let group = groups.find(group => group.name === groupname);
                                // filter out the group
                                let newGroups = groups.filter(group => group.name != groupname);
                                // check the the user is not already in the group and push
                                if (!group.users.includes(username)) {
                                    group.users.push(username);
                                }
                                // add the group back in 
                                newGroups.push(group);
                                const postAdd = JSON.stringify(groups);
                                fs.writeFile('groups.json', postAdd, 'utf-8', function (err) {
                                    if (err) throw err;
                                    res.send();
                                });
                            }
                        });

                        // update the users in the channel
                        channel.users.push(username);
                        // and finally push it back
                        newChannels.push(channel);
                        const postAdd = JSON.stringify(newChannels);
                        fs.writeFile('channels.json', postAdd, 'utf-8', function (err) {
                            if (err) throw err;
                            res.send();
                        });
                    }

                }
            }
        });
    });
}

