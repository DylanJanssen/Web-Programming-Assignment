module.exports = function (app, fs) {
    app.delete('/deleteChannelUser/:group/:channel/:user', (req, res) => {
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
                    // now filter out the user we are removing
                    let newUsers = channel.users.filter(user => user != username);
                    // update the users in the channel
                    channel.users = newUsers;
                    // and finally push it back
                    newChannels.push(channel);
                    const postRemove = JSON.stringify(newChannels);
                    fs.writeFile('channels.json', postRemove, 'utf-8', function (err) {
                        if (err) throw err;
                        res.send();
                    });
                }
            }
        });
    });
}

