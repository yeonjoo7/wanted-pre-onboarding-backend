"use strict";

const { Router } = require('express');
const router = Router();
const userController = require('../controllers/userController');

/**
 * @swagger
 *  /user/signUp:
 *    post:
 *      tags:
 *      - User
 *      description: 유저 회원가입
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: requestBody
 *          name: email
 *          required: true
 *          schema:
 *            type: string
 *          description: \'\@\'를 포함한 이메일 주소
 *        - in: requestBody
 *          name: userName
 *          required: true
 *          schema:
 *            type: string
 *          description: 유저 닉네임
 *        - in: requestBody
 *          name: password
 *          required: true
 *          schema:
 *              type: string
 *          description: 유저 비밀번호 8자 이상
 *      responses:
 *       200:
 *        description: 회원 가입 성공
 *       400:
 *        description: 유효하지 않은 이메일 & 비밀번호
 *       500:
 *        description: 서버 에러
 */
router.post('/signUp', async function (req, res, next) {
    try {
        await userController.signUp(req, res, next);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 *  /user/signIn:
 *    post:
 *      tags:
 *      - User
 *      description: 유저 로그인
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: requestBody
 *          name: email
 *          required: true
 *          schema:
 *            type: string
 *          description: 가입한 이메일 주소
 *        - in: requestBody
 *          name: password
 *          required: true
 *          schema:
 *              type: string
 *          description: 가입한 비밀번호
 *      responses:
 *       200:
 *        description: 로그인 성공
 *       400:
 *        description: 유효하지 않은 이메일 & 비밀번호
 *       500:
 *        description: 서버 에러
 */
router.post('/signIn', async function (req, res, next) {
    try {
        await userController.signIn(req, res, next);
    } catch (e) {
        next(e);
    }
});

/**
 * @swagger
 *  /user/signOut:
 *    post:
 *      tags:
 *      - User
 *      description: 유저 탈퇴
 *      produces:
 *      - application/json
 *      parameters:
 *        - in: requestBody
 *          name: email
 *          required: true
 *          schema:
 *            type: string
 *          description: 가입한 이메일 주소
 *        - in: requestBody
 *          name: password
 *          required: true
 *          schema:
 *              type: string
 *          description: 가입한 비밀번호
 *      responses:
 *       200:
 *        description: 회원 탈퇴 성공
 *       400:
 *        description: 유효하지 않은 이메일 & 비밀번호
 *       500:
 *        description: 서버 에러
 */
router.post('/signOut', async function (req, res, next) {
    try {
        await userController.signOut(req, res, next);
    } catch (e) {
        next(e);
    }
});


module.exports = router;
