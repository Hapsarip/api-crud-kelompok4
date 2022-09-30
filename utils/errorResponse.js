class errorResponse extends Error {
  constructor(message, statusCode) {
      super(message)
      this.statusCode = statusCode
      //res.status(statusCode).json({ message: message });
  }
}

module.exports = errorResponse