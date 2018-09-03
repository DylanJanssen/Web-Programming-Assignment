module.exports = function(app, fs){
    // route to retrieve channel
    app.get('/getChannel/:groupname/:channelname', (req, res) => {
        const groupname = req.params.groupname;
        const channelname = req.params.channelname;

        fs.readFile('channels.json', 'utf8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const channels = JSON.parse(data);
                const channel = channels.find(channel => channel.group === groupname && channelname === channel.name);
                console.log(channel);
                res.send(channel);
            }
        });
    });
}
