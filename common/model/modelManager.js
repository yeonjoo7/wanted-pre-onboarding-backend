'use strict';

const { Sequelize } = require("sequelize");
const config = require('../config');
const sequelize = new Sequelize(config['mysql'].database, config['mysql'].userName, config['mysql'].password, config['mysql']['options']);
console.debug("MySQL Connection successful");
initSequelizeErrorHandling();
const { DatabaseError } = require('../modules/customErrors');

class ModelManager {
    constructor() {
        this.sequelize = sequelize;
        this.Sequelize = Sequelize;
    }
    getModelFileList() {
        return [
            'users.js', 'board.js', 'logs.js'
        ];
    }

    async syncDB() {
        try {
            const fileNameList = this.getModelFileList();
            const db = {};
            const modelOptions = process.env.NODE_ENV === 'production' ? {} : {alter: true};
            for(const fileName of fileNameList) {
                const model = require(`./${fileName}`);
                model.initModel(sequelize);
                await model.sync(modelOptions);
                db[model.name] = model;
            }
            for(const modelName in db) {
                if(db[modelName].relationModel) {
                    db[modelName].relationModel();
                }
            }
            console.log("Complete MySQL Connection Sync");

        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }

    disconnectDB() {
        this.sequelize.close().catch(err => {console.log(err)});
    }

    get User () {
        return require('./users');
    }
    get Board() {
        return require('./board');
    }
    get Log() {
        return require('./logs');
    }

}

function initSequelizeErrorHandling () {
    const SequelizeModel = require('sequelize/lib/model');
    const orgFindAll = SequelizeModel.findAll;
    SequelizeModel.findAll = function() {
        return orgFindAll.apply(this, arguments).catch(err => {
            if(err instanceof DatabaseError) {
                throw err;
            }
            throw new DatabaseError(err.parent);
        })
    };

    const orgCreate = SequelizeModel.create;
    SequelizeModel.create = function() {
        return orgCreate.apply(this, arguments).catch(err => {
            if(err instanceof DatabaseError) {
                throw err;
            }
            throw new DatabaseError(err.parent);
        })
    };

    sequelize.query = function() {
        return this.Sequelize.prototype.query.apply(this, arguments).catch(err => {
            if(err instanceof DatabaseError) {
                throw err;
            }
            throw new DatabaseError(err.parent);
        })
    };
}

module.exports = new ModelManager();