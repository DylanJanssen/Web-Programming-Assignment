var port = 3000
module.exports = function (http) {
    http.listen(port, () => {
        var d = new Date()
        var h = d.getHours()
        var m = d.getMinutes()
        console.log('Server has been started at: ' + h + ':' + m + ' on port: ' + port)
    })
}
