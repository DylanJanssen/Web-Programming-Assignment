module.exports = function (app, formidable) {

    app.post('/upload', async (req, res) => {

        try {


            let form = new formidable.IncomingForm({ uploadDir: 'images' })
            form.keepExtensions = true

            form.on('error', function (err) {
                throw err
            })

            // This is where the renaming happens
            form.on('fileBegin', function (name, file) {
                // rename the incoming file to the file's name
                file.path = form.uploadDir + '/' + file.name
            })

            form.on('file', function (field, file) {
                res.send({
                    image: file.name
                })
            })

            form.parse(req)
        }
        catch (err) {
            console.log('Error during upload', err)
            return res.send({ status: 'error' })
        }

    })
}
