module.exports = {
    // update the item in the collection of the given query 
    item: async function (db, collectionName, query, newValues) {
        return new Promise((resolve, reject) => {
            db.collection(collectionName).updateOne(query, newValues, function (err, res) {
                if (err) throw err
                console.log(res.result.n + ' document updated')
                resolve()
            })
        })    
    }
}