const MongoDB = require('../modules/mongoClass');
const { ObjectId } = require('mongodb');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function getOne(req, res) {
    var connection = await new MongoDB('sample-api', req.params.coll).find(ObjectId(req.params.oid));
    if (connection.length > 0) response.setResponse(true, "OK", connection);
    return res.json(response.getResponse());
};
module.exports = getOne;  