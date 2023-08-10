'use strict';

const {ParameterError} = require("./customErrors");

module.exports = {
    customErrors: require('./customErrors'),
    parameterPresenceCheck: function(checkArray, parameters) {
        const parameterKeys = Object.keys(parameters);
        for(const key of checkArray) {
            if(!parameterKeys.includes(key) || !parameters[key]) {
                throw new ParameterError(key);
            }
        }
    }
};