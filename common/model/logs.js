"use strict";

const { DataTypes, Model } = require('sequelize');

const logAttributes = {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey:true},
    type: {type: DataTypes.STRING, allowNull: false},
    errorStack: {type: DataTypes.STRING, allowNull: true},
    serverIp: {type: DataTypes.STRING, allowNull: true},
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
            errorStack: logData.errorStack,
            serverIp: logData.serverIp,
            userId: logData.userId
        };
        return LogModel.build(logForm);
    }
}


module.exports = LogModel;