"use strict";

const jwt = require("jsonwebtoken");
const Model = require('../common/model/modelManager');
const { CustomError, InvalidPasswordError, UserNotFoundError} = require('../common/modules/customErrors');

exports.errorHandler = async (result, req, res, next) => {
    if(!(result instanceof Error) && result['status']) {
        const inputUrl = req.originalUrl.split('?')[0];
        await console.log(`[SUCCESS] ${(req.user && req.user.userName) ? req.user.userName : 'public'} - ${inputUrl}`,
                JSON.stringify({query: req.query, params:req.params, body: req.body}));
        return await res.status(200).json(result);
    }

    if(result instanceof Error) {
        if(result.status === 404) {
            return res.status(404).send({status: "fail", message: "404 Not Found"});
        }

        const errorContent = {type:result.code, errorStack: result.lastError? result.lastError : result.stack};
        if (result.userId) {
            errorContent['userId'] = result.userId;
        }
        if(result instanceof CustomError) {
            const returnForm = {
                status: "fail",
                code: result.code
            };
            if(result.hasOwnProperty('params')) returnForm['params'] = result.params;
            if(result.code.startsWith('SERVER')) {
                await Model.Log.makeNew(errorContent);
                returnForm.code = 'SERVER_ERROR';
                return await res.status(500).json(returnForm);
            }
            return await res.status(400).json(returnForm);
        }

        if(!errorContent.type) errorContent.type = 'UNKNOWN_ERROR';
        await Model.Log.makeNew(errorContent);
        return await res.status(500).json({
            status: "fail",
            code: "UNKNOWN_ERROR",
            message: (result.name) ? result.name : "UnknownError",
        });
    }
};

exports.authHandler = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if(!token) {
            return res.status(403).send({status: "fail", message: "Token is missing."});
        }
        const userId = jwt.verify(token, process.env.JWT_SECRET_KEY, {},function(err, decoded) {
            if (err) throw new InvalidPasswordError;
            return decoded.data;
        });
        const user = await Model.User.findOne({ where: {id: userId} });
        if(user.status !== 'ALIVE') {
            throw new UserNotFoundError;
        }
        req.userId = userId;
        next();
    } catch (e) {
        next(e);
    }
}