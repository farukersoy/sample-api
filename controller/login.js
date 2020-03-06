const Connection = require('../modules/mongoClass');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();
const Token = require('../modules/Token');

async function register(req, res) {
    if (typeof req.body.email === "undefined" || typeof req.body.password === "undefined") {
        response.setResponse(false, "Email or password missing.");
        return res.json(response.getResponse());
    }
    var user = await new Connection('sample-api', 'users').find({ email: req.body.email.toString(), password: req.body.password.toString() });
    if (user.length < 1) {
        response.setResponse(false, "Email or password is incorrect");
        return res.json(response.getResponse());
    } else {
        user = user[0];
        const data = { email: user.email, name: user.name, expire: req.timestamp + 2 * 24 * 60 * 60 }
        const token = new Token().create(data);
        console.log(data.expire)
        response.setResponse(true, "Auth successfull", { "token": token });
    }
    return res.json(response.getResponse());
};
module.exports = register;