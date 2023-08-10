"use strict";

const { DataTypes, Model } = require('sequelize');

const logAttributes = {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey:true},
    type: {type: DataTypes.STRING, allowNull: false},
    errStack: {type: DataTypes.TEXT, allowNull: true},
    userId: {type: DataTypes.BIGINT, allowNull: true}
};

class LogModel extends Model {
    static initModel(sequelize) {
        LogModel.init(logAttributes, {
            sequelize,
            modelName: 'Log'
        });
    }

    static async makeNew(logData){
        let logForm = {
            type: logData.type,
            errStack: String(logData.errorStack),
            userId: logData.userId
        };
        const log = await LogModel.build(logForm)
        return await log.save();
    }
}


module.exports = LogModel;