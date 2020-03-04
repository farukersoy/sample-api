var MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

//ilk sorulara yanıt not deleted ile gelmiyor, async ile db sorgusunu sıraya almam gerek yoksa sorgu tamamlanmadan dönüş yapıyor

async function deleter (req, res) {
    const id = req.params.id;
    var body = { $set: req.body };
    MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        var db = client.db('yepyenidb')
        db.collection(req.params.coll).deleteOne({ _id: ObjectId(id) }, body, function (err, res) {
            if (err) throw err;
            if (res.deletedCount > 0) response.setResponse(true, "OK"); 
            else  response.setResponse(false, "not deleted");
        });
    });
    return res.json(response.getResponse());
};
module.exports = deleter;