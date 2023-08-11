"use strict";

const { Router } = require('express');
const router = Router();
const { authHandler } = require('../controllers/middleware');
const boardController = require('../controllers/boardController');
const {PostNotFoundError} = require("../common/modules/customErrors");

/**
 * @swagger
 *  /board/all:
 *    get:
 *      tags:
 *      - Board
 *      description: 게시판 전체 글 Pagination
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: query
 *          name: offset
 *          required: true
 *          schema:
 *            type: string
 *          description: skip할 게시글 수
 *        - in: query
 *          name: limit
 *          required: true
 *          schema:
 *            type: string
 *          description: 보여줄 게시글 갯수
 *      responses:
 *       200:
 *        description: 성공
 *       400:
 *        description: 입력 실수
 *       403:
 *        description: request header 에 로그인 token 없음
 *       500:
 *        description: 서버 에러
 */
router.get('/all', async function (req, res, next) {
    try {
        await boardController.findAllPost(req, res, next);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 *  /board/{id}:
 *    get:
 *      tags:
 *      - Board
 *      description: 게시판 id로 특정 글 조회
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: 게시글 id
 *      responses:
 *       200:
 *        description: 성공
 *       403:
 *        description: request header 에 로그인 token 없음
 *       500:
 *        description: 서버 에러
 */
router.get('/:id', async function (req, res, next) {
    try {
        const postId = req.params.id;
        if(!postId) throw new PostNotFoundError;
        await boardController.findOnePost(req, res, next);
    } catch (e) {
        next(e);
    }
});


router.use(authHandler);

/**
 * @swagger
 *  /board/new:
 *    post:
 *      tags:
 *      - Board
 *      description: 게시글 등록
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: header
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: 로그인 토큰
 *        - in: formData
 *          name: title
 *          required: true
 *          schema:
 *            type: string
 *          description: 게시글 제목
 *        - in: formData
 *          name: content
 *          required: true
 *          schema:
 *            type: string
 *          description: 게시글 내용
 *        - in: formData
 *          name: isPrivate
 *          required: false
 *          schema:
 *            type: boolean
 *          description: 게시글 잠금 여부
 *        - in: formData
 *          name: password
 *          required: false
 *          schema:
 *            type: string
 *          description: 게시글 잠금 비밀번호
 *      responses:
 *       200:
 *        description: 게시글 등록 성공
 *       400:
 *        description: 입력 실수
 *       403:
 *        description: request header 에 로그인 token 없음
 *       500:
 *        description: 서버 에러
 */
router.post('/new', async function (req, res, next) {
    try {
        await boardController.addPost(req, res, next);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 *  /board/{id}:
 *    patch:
 *      tags:
 *      - Board
 *      description: 게시글 수정
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: 게시글 id
 *        - in: header
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: 로그인 토큰
 *        - in: formData
 *          name: title
 *          required: true
 *          schema:
 *            type: string
 *          description: 수정할 게시글 제목
 *        - in: formData
 *          name: content
 *          required: true
 *          schema:
 *            type: string
 *          description: 수정할 게시글 내용
 *        - in: formData
 *          name: isPrivate
 *          required: false
 *          schema:
 *            type: boolean
 *          description: 게시글 잠금 여부
 *        - in: formData
 *          name: password
 *          required: false
 *          schema:
 *            type: string
 *          description: 게시글 잠금 비밀번호
 *      responses:
 *       200:
 *        description: 게시글 수정 성공 및 게시글 반환
 *       400:
 *        description: 입력 실수
 *       403:
 *        description: request header 에 로그인 token 없음
 *       500:
 *        description: 서버 에러
 */
router.patch('/:id', async function (req, res, next) {
    try {
        const postId = req.params.id;
        if(!postId) throw new PostNotFoundError;
        await boardController.editPost(req, res, next);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 *  /board/{id}:
 *    delete:
 *      tags:
 *      - Board
 *      description: 게시글 삭제
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: 게시글 id
 *        - in: header
 *          name: token
 *          required: true
 *          schema:
 *            type: string
 *          description: 로그인 토큰
 *      responses:
 *       200:
 *        description: 게시글 삭제 성공
 *       400:
 *        description: 입력 실수
 *       403:
 *        description: request header 에 로그인 token 없음
 *       500:
 *        description: 서버 에러
 */
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
