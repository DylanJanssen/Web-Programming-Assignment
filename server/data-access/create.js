module.exports = {
    item: async function (db, collectionName, obj) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).insertMany(obj, function (err, res) {
                if (err) throw err
                console.log(res.result.n)
                resolve()
            })
        })
    },

    collection: async function (db, collectionName) {
        return new Promise((resolve, reject) => {
            db.createCollection(collectionName, function (err, res) {
                if (err) throw err
                console.log('Collection created')
                resolve()
            })
        })
    }
}