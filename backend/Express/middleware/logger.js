function logger(req, res, next) {
  const currentTime = new Date().toISOString();
  console.log(
    `Request: ${req.method}, Request original URL: ${req.originalUrl}, Request was made at: ${currentTime}`
  );
  next();
}

module.exports = logger;
