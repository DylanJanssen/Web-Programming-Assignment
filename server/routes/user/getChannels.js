module.exports = function (app, fs) {
    // route to retrieve channels corresponding to username and group 
    app.get('/getChannels/:groupname/:username', (req, res) => {
        const groupname = req.params.groupname;
        const username = req.params.username;

        fs.readFile('channels.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                const channels = JSON.parse(data);
                const userChannels = channels.filter(channel => channel.group === groupname && channel.users.includes(username));
                res.send(userChannels);
            }
        });
    });
}
