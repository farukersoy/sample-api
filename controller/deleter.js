var Connection = require('../modules/mongoClass');
const { ObjectId } = require('mongodb');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function deleter(req, res) {
    var id = req.params.id
    var connect = await new Connection('sample-api', req.params.coll).delete({ _id: ObjectId(id) });
    if (connect.deletedCount > 0) response.setResponse(true, "OK");
    else response.setResponse(false, "not deleted");
    return res.json(response.getResponse());
};
module.exports = deleter;