const Connection = require('../modules/mongoClass');
const { ObjectId } = require('mongodb');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function getter(req, res) {
    var connect = await new Connection('sample-api', req.params.coll).find();
    if (connect.length > 0) response.setResponse(true, "OK", connect);
    return res.json(response.getResponse());
};
module.exports = getter;  