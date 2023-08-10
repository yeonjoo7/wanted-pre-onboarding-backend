"use strict";

const { DataTypes, Model } = require('sequelize');
const crypto = require('crypto');
const ModelManager = require('./modelManager');
const { InvalidPasswordError } = require('../modules/customErrors');

const userAttributes = {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey:true},
    userName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    salt: {type: DataTypes.STRING},
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
                },
                {
                    fields: ['userName'],
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
        const newUser = await UserModel.build(userForm);
        return await newUser.save();
    }

    static encryptPassword(password, salt){
        return crypto.createHash ( 'RSA-SHA256').update (password).update (salt).digest ('hex');
    }

    static setSaltAndPassword(user){
        user.salt = crypto.randomBytes(128).toString( 'base64');
        user.password = UserModel.encryptPassword(user.password, user.salt);
    }

    validatePassword(passwordInput) {
        return UserModel.encryptPassword(passwordInput, this.salt) === this.password;
    }

    static async signOut(email){
        const user = await UserModel.findOne({ where: {email: email}});
        user.status = 'SIGNOUT';
        return await user.save();
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