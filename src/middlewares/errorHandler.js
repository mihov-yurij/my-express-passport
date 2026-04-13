module.exports = (err, req, res, next) => {
    console.error(err.stack); // Логируем ошибку для разработчика

    // Если у ошибки нет статуса, ставим 500 (Internal Server Error)
    const status = err.status || 500;
    const message = err.message || "Something went wrong on the server";

    res.status(status).send(`Error ${status}: ${message}`);
};