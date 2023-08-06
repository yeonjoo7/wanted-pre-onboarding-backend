"use strict";

const { DataTypes, Model, Deferrable} = require('sequelize');
const ModelManager = require('./index');

const boardAttributes = {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey:true},
    userId: {type: DataTypes.BIGINT, references: {model: 'Users', key: 'id', deferrable: Deferrable.INITIALLY_DEFERRED()}},
    post: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: true},
    isPrivate: {type: DataTypes.BOOLEAN, defaultValue: false}
};

class BoardModel extends Model {
    static initModel(sequelize) {
        BoardModel.init(boardAttributes, {
            sequelize,
            modelName: 'Board',
            indexes: [
                { fields: ['userId'] }
            ]});
    }

    static relationModel() {
        BoardModel.belongsTo(ModelManager.User, {as: 'user', foreignKey: "userId"});
    }

    static async makeNew(postData){
        let postForm = {
            userId: postData.userId,
            post: postData.post,
            password: postData.password,
            isPrivate: postData.isPrivate,
        };
        return BoardModel.build(postForm);
    }
}


module.exports = BoardModel;