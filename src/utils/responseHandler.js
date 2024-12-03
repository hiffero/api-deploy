// Utility to standardize API responses
const successResponse = (res, data, message = 'Success') => {
    res.status(200).json({ status: 'success', message, data });
};

const errorResponse = (res, message = 'Error', statusCode = 500) => {
    res.status(statusCode).json({ status: 'error', message });
};

module.exports = { successResponse, errorResponse };
