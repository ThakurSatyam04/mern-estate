export const errorHandler = (statusCode, message) => {
    const error = newError();
    error.statusCode = statusCode;
    error.message = message
    return error;
}