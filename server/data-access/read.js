module.exports = {
    items: async function (db, collectionName) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).find({}).toArray(function (err, res) {
                if (err) throw err
                resolve(res)
            })
        })        
    },
    // checks if query exists, res will be true if it does
    itemExists: async function (db, collectionName, query) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).findOne(query, function(err, res) {
                if (err) {
                    throw err
                }
                resolve(res)
            })
        })
    },

    findItems: async function (db, collectionName, query) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).find(query).toArray(function(err, res) {
                if (err) {
                    throw err
                }
                resolve(res)
            })
        })
    }
}