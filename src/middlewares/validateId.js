module.exports = (paramName) => {
    return (req, res, next) => {
        const id = req.params[paramName];
        if (/^\d+$/.test(id)) {
            next();
        } else {
            const error = new Error(`${paramName} must be a number`);
            error.status = 400;
            next(error);
        }
    };
};
