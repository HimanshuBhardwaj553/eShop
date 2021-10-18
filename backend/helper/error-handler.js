const errorHandler = ((err, req, res, next) => {
    console.log(err);
    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        res.status(401).json({ message: 'The User Is not Authorized' })
    }
    if (err.name === 'ValidationError') {
        // validation error
        res.status(401).json({ message: err })
    }
    // default to 500 server error
    res.status(500).json(err);
});

module.exports = errorHandler;