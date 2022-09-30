const customError = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message

    // Mongoose error handling
    if(err.name === 'CastError') {
        const message = `Resource not found with ID = ${err.value}`
        error = new customError(message, 404)
    }

    // Mongoose duplicate data
    if(err.code === 11000) {
        const message = 'Duplicate field data entered. Input different value'
        error = new customError(message, 400)
    }

    // Mongoose validation error
    if(err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(val => val.message)
        const message = `Input not Valid. Check data type. ${errors.join('. ')}`
        error = new customError(message, 400)
    }

    // Unknonw Error
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Internal Server Error'
    })
}

module.exports = errorHandler