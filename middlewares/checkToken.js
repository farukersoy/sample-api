const Token = require('../modules/Token');
const moment = require('moment-timezone');
const MainResponse = require('../modules/MainResponse');
const response = new MainResponse();

checkToken = function (req, res, next) {
    req.moment = moment().locale("tr");
    req.timestamp = req.moment.format('X');
    req.timestamp = parseInt(req.timestamp);

    const { authorization } = req.headers;

    const newToken = new Token();

    if (authorization) {
        //Parse bearer token from header
        const bearerToken = req.headers.authorization.split(' ')[1];

        if (!newToken.verify(bearerToken)) {
            response.setResponse(false, 'invalid bearer token, check token');
        }
        //continue
        req.user = newToken.decode();
        console.log(req.user.expire)
        if (req.timestamp > req.user.expire) {
            response.setResponse(false, 'oturum eskidi');
        }
        return next();
    }

    // Login pathini kontrol ediyoruz.
    const regex = /(register|login)/;
    if (regex.exec(req.originalUrl) === null) {
        response.setResponse(false, 'token yok');
    } else {
        return next();
    }

    return res.json(response.getResponse());

};

module.exports = checkToken;
