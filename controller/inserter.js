let Connection = require('../modules/mongoClass');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function inserter(req, res) {
    let connect = await new Connection('sample-api', req.params.coll).insertOne(req.body);
    if (connect.insertedCount > 0) response.setResponse(true, "OK");
    else response.setResponse(false, "not deleted");
    return res.json(response.getResponse());
};
module.exports = inserter;