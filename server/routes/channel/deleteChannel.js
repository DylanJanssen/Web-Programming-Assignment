module.exports = function (app, fs) {
    app.delete('/deleteChannel/:groupname/:channelname', (req, res) => {
        const groupname = req.params.groupname;
        const channelname = req.params.channelname;

        fs.readFile('channels.json', 'utf-8', function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                const channels = JSON.parse(data);
                const postRemove = JSON.stringify(channels.filter(channel => channel.name != channelname));
                fs.writeFile('channels.json', postRemove, 'utf-8', function (err) {
                    if (err) throw err;
                    res.send();
                });
            }
        });
    });
}
