
handler = function (req, res, next) {
    const error = new Error('Page not found');
    next(error);
}
module.exports = handler;