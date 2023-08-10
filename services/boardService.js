"use strict";

const Model = require('../common/model/modelManager');
const {NoAuthorizationError} = require("../common/modules/customErrors");


exports.addPost = async (userId, content, password, isPrivate) => {
    try {
        await Model.Board.create({userId, content: content, password, isPrivate});
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

exports.editPost = async (userId, postId, content, password) => {
    try {
        const post = await Model.Board.findOne({ where: {id: postId} });
        if(post.userId !== userId || post.password !== password) throw new NoAuthorizationError;
        post.content = content;
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