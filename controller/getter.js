var MongoClient = require('mongodb').MongoClient

module.exports = async function (req, res) {
    MongoClient.connect('mongodb://localhost:27017', function (err, client) {
        if (err) throw err

        var db = client.db('yepyenidb')

        db.collection('kullanicilar').find().toArray(function (err, result) {
            if (err) throw err

            res.json(result)
        })
    })
}