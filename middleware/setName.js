function setName(req, res, next) {
    if (req.auth === false) {
        return next(new Error(403))
    }
    res.locals.name = "Bob"
    next()
}

module.exports = setName