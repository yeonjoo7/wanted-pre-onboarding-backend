"use strict";

const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

router.post('/signUp', async function (req, res, next) {
    try {
        await userController.signUp(req, res, next);
    } catch (e) {
        next(e);
    }
});

router.post('/signIn', async function (req, res, next) {
    try {
        await userController.signIn(req, res, next);
    } catch (e) {
        next(e);
    }
});

router.post('/signOut', async function (req, res, next) {
    try {
        await userController.signOut(req, res, next);
    } catch (e) {
        next(e);
    }
});


module.exports = router;
