"use strict";

const Model = require('../common/model/modelManager');
const {NoAuthorizationError, InvalidPasswordError} = require("../common/modules/customErrors");


exports.addPost = async (userId, title, content, password, isPrivate) => {
    try {
        await Model.Board.create({userId, title, content, password, isPrivate});
    } catch (e) {
        throw e;
    }
}

exports.findAllPost = async (offset, limit) => {
    try {
        return await Model.Board.findAll({ offset: offset, limit: limit });
    } catch (e) {
        throw e;
    }
}

exports.findOnePost = async (postId) => {
    try {
        const post = await Model.Board.findOne({ where: {id: postId} });
        if(!post) return 'empty';
        return post;
    } catch (e) {
        throw e;
    }
}

exports.editPost = async (userId, postId, title, content, password) => {
    try {
        const post = await Model.Board.findOne({ where: {id: postId} });
        if(post.userId !== userId) throw new NoAuthorizationError;
        if(!!post.isPrivate && post.password !== password) throw new InvalidPasswordError;
        if(!!title && post.title !== title) post.title = title;
        if(!!content && post.content !== content) post.content = content;
        return await post.save();
    } catch (e) {
        throw e;
    }
}

exports.deletePost = async (userId, postId) => {
    try {
        const post = await Model.Board.findOne({ where: {id: postId} });
        if(post.userId !== userId) throw new NoAuthorizationError;
        post.isDeleted = true;
        return await post.save();
    } catch (e) {
        throw e;
    }
}