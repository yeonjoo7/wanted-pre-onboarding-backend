"use strict";

const { Router } = require('express');
const router = Router();
const { authHandler } = require('../controllers/middleware');
const boardController = require('../controllers/boardController');
const {PostNotFoundError} = require("../common/modules/customErrors");


router.get('/all', async function (req, res, next) {
    try {
        await boardController.findAllPost(req, res, next);
    } catch (e) {
        next(e);
    }
});

router.use(authHandler);

router.post('/new', async function (req, res, next) {
    try {
        await boardController.addPost(req, res, next);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        const postId = req.params.id;
        if(!postId) throw new PostNotFoundError;
        await boardController.findOnePost(req, res, next);
    } catch (e) {
        next(e);
    }
});

router.patch('/:id', async function (req, res, next) {
    try {
        const postId = req.params.id;
        if(!postId) throw new PostNotFoundError;
        await boardController.editPost(req, res, next);
    } catch (e) {
        next(e);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const postId = req.params.id;
        if(!postId) throw new PostNotFoundError;
        await boardController.deletePost(req, res, next);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
