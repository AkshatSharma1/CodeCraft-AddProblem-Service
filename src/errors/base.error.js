//Create a base error class

//NODEJS has its own Error Class (Interface), so we have extended it(Error MDN)
class BaseError extends Error {
  constructor(name, statusCode, description, details) {
    super(description); //constructor of error class
    this.name = name;
    this.statusCode = statusCode;
    this.details = details;
    // Error.captureStackTrace(this); //It captures the location at which the error took place. It is taken from Nodejs error class
  }
}

module.exports = BaseError;
