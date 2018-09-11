module.exports = {
    items: async function (db, collectionName) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).find({}).toArray(function (err, res) {
                if (err) throw err
                console.log(res)
                resolve(res)
            })
        })        
    },
    // checks if query exists, res will be true if it does
    itemExists: async function (db, collectionName, query) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).findOne(query, function(err, res) {
                if (err) {
                    reject()
                }
                console.log(res)
                resolve(res)
            })
        })
    }
}