"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var CustomError_1 = require("../errors/CustomError");
var ErrorResponse_1 = require("../responses/ErrorResponse");
var errorHandler = function (err, req, res, next) {
    var response;
    if (err instanceof CustomError_1.CustomError) {
        response = new ErrorResponse_1.ErrorResponse(err.serializeErrors());
        return res.status(err.statusCode).send(response);
    }
    if (err.name === 'UnauthorizedError' || err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
        if (err.message === 'jwt expired') {
            response = new ErrorResponse_1.ErrorResponse([{ code: 112, message: 'Access token expired' }]);
        }
        else {
            response = new ErrorResponse_1.ErrorResponse([{ code: 111, message: 'Unauthorized' }]);
        }
        return res.status(401).send(response);
    }
    response = new ErrorResponse_1.ErrorResponse([{ message: err.message }]);
    return res.status(500).send(response);
};
exports.errorHandler = errorHandler;
