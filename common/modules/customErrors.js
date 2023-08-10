"use strict";

class CustomError extends Error {
    constructor (lastError) {
        super();
        if(lastError) {
            if(lastError instanceof Error || typeof lastError == 'object'){
                this.lastError = lastError;
            }
        }
    }
}
exports.CustomError = CustomError;

exports.DatabaseError = class DatabaseError extends CustomError {
    constructor(lastError) {
        super(lastError);
        this.code = 'SERVER_DATABASE_ERROR';
    }
}

exports.ParameterError = class ParameterError extends CustomError {
    constructor(...args) {
        super();
        if(args.length > 0) {
            this.params = args;
        }
        this.code = 'PARAMETER_MISSING_OR_INVALID';
    }
}

exports.UserEmailAlreadyRegisteredError = class UserEmailAlreadyRegisteredError extends CustomError {
    constructor(lastError) {
        super(lastError);
        this.code = 'INVALID_EMAIL';
    }
}

exports.InvalidPasswordError = class InvalidPasswordError extends CustomError {
    constructor(lastError) {
        super(lastError);
        this.code = 'NOT_CORRESPOND_PW';
    }
}

exports.UserNotFoundError = class UserNotFoundError extends CustomError {
    constructor(lastError) {
        super(lastError);
        this.code = 'USER_NOT_FOUND';
    }
}
