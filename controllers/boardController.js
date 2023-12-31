"use strict";

const boardService = require('../services/boardService');
const { parameterPresenceCheck } = require('../common/modules');
const {ParameterError} = require("../common/modules/customErrors");

const checkArray = {
    createAPost : ['title', 'content', 'isPrivate'],
    findAllPosts: ['offset', 'limit'],
};

exports.addPost = async (req, res, next) => {
    try  {
        const { title, content, password, isPrivate } = req.body;
        parameterPresenceCheck(checkArray.createAPost, {title, content, isPrivate});
        if(JSON.parse(isPrivate) && !password) throw new ParameterError;
        await boardService.addPost(req.userId, title, content, password, JSON.parse(isPrivate));
        return next({status: 'success'});
    } catch (e) {
        next(e);
    }
}

exports.findAllPost = async (req, res, next) => {
    try  {
        const { offset, limit } = req.query;
        if(!offset || !limit || parseInt(offset)<0 || parseInt(limit)<0) throw new ParameterError;
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
        if(parseInt(postId)<0) throw new ParameterError;
        const post = await boardService.findOnePost(postId);
        return next({status: 'success', posts: post});
    } catch (e) {
        next(e);
    }
}

exports.editPost = async (req, res, next) => {
    try  {
        const postId = req.params.id;
        if(parseInt(postId)<0) throw new ParameterError;
        const { title, content, password } = req.body;
        const post = await boardService.editPost(req.userId, postId, title, content, password);
        return next({status: 'success', posts: post});
    } catch (e) {
        next(e);
    }
}

exports.deletePost = async (req, res, next) => {
    try  {
        const postId = req.params.id;
        if(parseInt(postId)<0) throw new ParameterError;
        await boardService.deletePost(req.userId, postId);
        return next({status: 'success'});
    } catch (e) {
        next(e);
    }
}