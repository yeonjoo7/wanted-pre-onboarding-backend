"use strict";

const boardService = require('../services/boardService');
const { parameterPresenceCheck } = require('../common/modules');

const checkArray = {
    createAPost : ['content', 'password', 'isPrivate'],
    findAllPosts: ['offset', 'limit'],
    editPost: ['postId', 'content', 'password'],
};

exports.addPost = async (req, res, next) => {
    try  {
        const { content, password, isPrivate } = req.body;
        parameterPresenceCheck(checkArray.createAPost, {content, password, isPrivate});
        await boardService.addPost(req.userId, content, password, JSON.parse(isPrivate));
        return next({status: 'success'});
    } catch (e) {
        next(e);
    }
}

exports.findAllPost = async (req, res, next) => {
    try  {
        const { offset, limit } = req.body;
        parameterPresenceCheck(checkArray.findAllPosts, {offset, limit});
        const posts = await boardService.findAllPost(parseInt(offset), parseInt(limit));
        return next({status: 'success', posts: posts});
    } catch (e) {
        next(e);
    }
}

exports.findOnePost = async (req, res, next) => {
    try  {
        const postId = req.params.id;
        const post = await boardService.findOnePost(postId);
        return next({status: 'success', posts: post});
    } catch (e) {
        next(e);
    }
}

exports.editPost = async (req, res, next) => {
    try  {
        const postId = req.params.id;
        const { content, password } = req.body;
        parameterPresenceCheck(checkArray.editPost, {postId, content, password});
        const post = await boardService.editPost(req.userId, postId, content, password);
        return next({status: 'success', posts: post});
    } catch (e) {
        next(e);
    }
}

exports.deletePost = async (req, res, next) => {
    try  {
        const postId = req.params.id;
        await boardService.deletePost(req.userId, postId);
        return next({status: 'success'});
    } catch (e) {
        next(e);
    }
}