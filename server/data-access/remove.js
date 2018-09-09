module.exports = {
    item: async function (db, collectionName, delQuery) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).deleteOne(delQuery, function (err, obj) {
                if (err) throw err
                console.log(obj.result.n + ' document deleted')
                resolve()
            })
        })
    }
}