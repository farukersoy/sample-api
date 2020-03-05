let Connection = require('../modules/mongoClass');
const { ObjectId } = require('mongodb');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function updater(req, res) {
    const id = req.params.id;
    let body = { $set: req.body };
    let connect = await new Connection('sample-api', req.params.coll).update(ObjectId(req.params.id), body, true);
    if (connect === true) response.setResponse(true, "Document updated", req.body);
    else response.setResponse(false, "Document not updated");
    return res.json(response.getResponse());
};
module.exports = updater;