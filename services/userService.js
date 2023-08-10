"use strict";

const jwt = require("jsonwebtoken");
const Model = require('../common/model/modelManager');
const { InvalidPasswordError, UserEmailAlreadyRegisteredError } = require('../common/modules/customErrors');

function userEmailAndPasswordValidationCheck(email, password) {
    if (password.length < 8) {
        throw new InvalidPasswordError();
    }
    if (!email.includes('@')) {
        throw new UserEmailAlreadyRegisteredError();
    }
}

exports.signUp = async function (email, userName, password) {
    try {
        userEmailAndPasswordValidationCheck(email, password);
        return await Model.User.create({email: email, userName: userName, password: password});
    } catch (e) {
        throw e;
    }
}

exports.signIn = async function (email, password) {
    try {
        userEmailAndPasswordValidationCheck(email, password);
        const user = await Model.User.findOne({ where:{ email: email }});
        const token = jwt.sign({data: user.id}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        return { userId: user.id, token: token };
    } catch (e) {
        throw e;
    }
}

exports.signOut = async function (email, password) {
    try {
        userEmailAndPasswordValidationCheck(email, password);
        return await Model.User.signOut(email);
    } catch (e) {
        throw e;
    }
}