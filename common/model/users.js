"use strict";

const { DataTypes, Model } = require('sequelize');
const ModelManager = require('./index');
const { InvalidPasswordError } = require('../modules/customErrors');

const userAttributes = {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey:true},
    userName: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    salt: {type: DataTypes.STRING, allowNull: false},
    lastLogin: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    status: {type: DataTypes.STRING(10), allowNull:false, defaultValue:'ALIVE'}
};

class UserModel extends Model {
    static initModel(sequelize) {
        UserModel.init(userAttributes, {
            sequelize,
            modelName: 'User',
            indexes: [
                {
                    fields: ['email'],
                    unique: true
                }
            ]});
        UserModel.beforeCreate(UserModel.setSaltAndPassword);
    }

    static relationModel() {
        UserModel.hasMany(ModelManager.Board, {as: 'posts', foreignKey:"userId"});
    }

    static async makeNew(userData){
        let userForm = {
            userName: userData.userName,
            email: userData.email,
            password: userData.password,
            lastLogin: userData.lastLogin,
        };
        return UserModel.build(userForm)
    }

    static encryptPassword(password, salt){
        return crypto.createHash ( 'RSA-SHA256').update (password).update (salt).digest ('hex');
    }

    static setSaltAndPassword(user){
        user.salt = crypto.randomBytes(128).toString( 'base64');
        user.password = UserModel.encryptPassword(user.password, user.salt);
    }

    validatePassword(passwordInput) {
        return UserModel.encryptPassword(passwordInput, this.salt) === this.password
    }

    async updatePassword(password, newPassword) {
        if(!this.validatePassword(password)) {
            throw new InvalidPasswordError();
        }
        this.password = newPassword;
        UserModel.setSaltAndPassword(this);
        await this.save();
    }
}


module.exports = UserModel;