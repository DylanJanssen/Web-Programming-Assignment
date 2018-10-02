module.exports = {
    // inserting an object into the database
    item: async function (db, collectionName, obj) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).insertMany(obj, function (err, res) {
                if (err) throw err
                console.log(res.result.n + 'documents inserted')
                resolve()
            })
        })
    },

    // create a new collection in the database
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