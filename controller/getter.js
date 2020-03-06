const Connection = require('../modules/mongoClass');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function getter(req, res) {
    console.log(req.timestamp)
    var connect = await new Connection('sample-api', req.params.coll).find();
    if (connect.length > 0) response.setResponse(true, "OK", connect);
    return res.json(response.getResponse());
};
module.exports = getter;  