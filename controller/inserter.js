var MongoClient = require('mongodb').MongoClient
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

//ilk sorulara yanıt not deleted ile gelmiyor, async ile db sorgusunu sıraya almam gerek yoksa sorgu tamamlanmadan dönüş yapıyor

async function inserter(req, res) {
    MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        var db = client.db('yepyenidb')
        db.collection(req.params.coll).insertOne(req.body, function (err, result) {
            if (err) throw err;
            client.close();
            if (result.insertedCount > 0) response.setResponse(true, result.ops)
        });
    });
    return res.json(response.getResponse());
};
module.exports = inserter;