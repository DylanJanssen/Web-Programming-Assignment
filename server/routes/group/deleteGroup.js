module.exports = function(app, fs){
    app.delete('/deleteGroup/:name', (req, res) => {
        const name = req.params.name;
        
        fs.readFile('groups.json', 'utf-8', function(err, data){
            if (err){
                console.log(err);
            }
            else{
                const groups = JSON.parse(data);
                const postRemove = JSON.stringify(groups.filter(group => group.name != name));
                fs.writeFile('groups.json', postRemove, 'utf-8', function(err){
                    if (err) throw err;
                    // send response that registration was successful
                    res.send({'name':name, 'success':true});
                });                             
            }
        });
    });
}

