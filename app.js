'use strict';

const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const { errorHandler } = require('./controllers/middleware');
const userRoute = require('./routes/userRoute');
const boardRoute = require('./routes/boardRoute');
const { swaggerUi, specs } = require('./common/modules/swagger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/user', userRoute);
app.use('/board', boardRoute);
app.use(function(req, res, next) {
    if(req.url === '/') {
        return res.status(200).send({status: 'success', message: `Hi, there!`});
    }
    console.log(req.url);
    next(createError(404));
});
app.use(errorHandler);


module.exports = app;