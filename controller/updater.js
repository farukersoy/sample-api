var MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function updater(req, res) {
    const id = req.params.id;
    var body = { $set: req.body };
    MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, function (err, client) {
        if (err) throw err
        var db = client.db('yepyenidb')
        db.collection(req.params.coll).updateOne({ _id: ObjectId(id) }, body, function (err, result) {
            if (err) throw err;
            client.close();
            if (result.modifiedCount > 0) response.setResponse(true, 'document updated')
        });
    });
    return res.json(response.getResponse());
};
module.exports = updater;