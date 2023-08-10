"use strict";

const userService = require('../services/userService');
const { parameterPresenceCheck } = require('../common/modules');

const checkArray = {
    authentication : ['email', 'password'],
    fullInfo: ['email', 'userName', 'password']
};

exports.signUp = async (req, res, next) => {
    try {
        const {email, userName, password} = req.body;
        parameterPresenceCheck(checkArray.fullInfo, {email, userName, password});

        await userService.signUp(email, userName, password);
        return next({status: 'success'});
    } catch (e) {
        next(e);
    }
}

exports.signIn = async (req, res, next) => {
    try {
        parameterPresenceCheck(checkArray.authentication, req.body);
        const {email, password} = req.body;

        const userIdWithToken = await userService.signIn(email, password);
        return next({status: 'success', user: userIdWithToken});
    } catch (e) {
        next(e);
    }
}

exports.signOut = async (req, res, next) => {
    try {
        parameterPresenceCheck(checkArray.authentication, req.body);
        const {email, password} = req.body;

        await userService.signOut(email, password);
        return next({status: 'success'});
    } catch (e) {
        next(e);
    }
}