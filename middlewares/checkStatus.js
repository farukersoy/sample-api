const Connection = require('../modules/mongoClass');

checkStatus = async function (req, res, next) {

    var email = req.user
    var user = await new Connection('sample-api', 'users').find({ "email": req.user.email });
    console.log(user)
    if (user.length > 0 && user[0].status === true) {
        if (user[0].permType === req.user.permType) {
            return next();
        }
        return res.json({ status: false, desc: "Yetkisiz kullanıcı" })
    } else {
        return res.json({ status: false, desc: "Deaktif Kullanıcı" })
    }




};

module.exports = checkStatus;
