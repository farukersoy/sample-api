const Connection = require('../modules/mongoClass');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

async function register(req, res) {
    const newUser = {
        email: req.body.email,
        password:  req.body.password, 
        name: req.body.name,
        mobile: req.body.mobile,
        birthdate: req.body.birthdate,
        permType: 1,
        status: true,
        registerTime: req.timestamp
    }
    var emailExist = await new Connection('sample-api','users').find({email: req.body.email});
    if (emailExist.length >= 1) {
        response.setResponse(false, "Email is existing.");
    } else {
        const connect = await new Connection('sample-api', 'users').insertOne(newUser);
        if (connect.insertedCount > 0) {
            response.setResponse(true, "Register Success");
        } else {
            response.setResponse(false, "Can't register now!");
        }
    }
    return res.json(response.getResponse());
};
module.exports = register;