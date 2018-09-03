var port = 3000;
module.exports = function (http) {
    http.listen(port, () => {
        var d = new Date();
        var n = d.getHours();
        var m = d.getMinutes();
        console.log('Server has been started at: ' + n + ':' + m + ' on port: ' + port);
    });
}
