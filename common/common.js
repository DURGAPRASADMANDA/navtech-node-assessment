// Importing the required modules
const jwt = require('jwt-simple');
const moment = require('moment');
const crypto = require('crypto');
const _ = require('lodash');
const uuid = require('uuid');
const enums = require('./enum');

/**
 * Token Generation Code.
 * @param {Object} res response object.
 * @param {Object} userObj user details object.
 */
const authorization = async (res, userObj) => {
    try {
        const expires = moment().add(enums.LOGIN_PARMS.SESSION_EXP_TIME, enums.LOGIN_PARMS.SESSION_EXP_TYPE).valueOf();
        const Authorization = await jwt.encode({
            username: userObj.username,
            firstName: userObj.firstName,
            lastName: userObj.lastName,
            uuid: uuid.v1(),
            exp: expires
        }, enums.LOGIN_PARMS.jwtSecret);
        res.header('Authorization', 'Bearer ' + Authorization);
        return 'Bearer ' + Authorization;
    } catch (err) {
        throw err;
    }
};
/**
 * Salt Generation Code.
 * @param {number} length of salt for password encryption.
 */
const saltGeneration = async (length) => {
    try {
        return await crypto.randomBytes(Math.ceil(length / 2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, length); // return required number of characters
    } catch (err) {
        return cfg.defaultSalt;
    }
};

/**
 * Pasword Encryption Code.
 * @param {String} password for encryption.
 * @param {String} salt for encryption.
 */
const passwordEncryption = async (password, salt) => {
    try {
        const hash = crypto.createHmac('sha512', salt); // Hashing algorithm sha512
        hash.update(password);
        const value = await hash.digest('hex');
        return {
            salt: salt,
            passwordHash: value
        };
    } catch (err) {
        throw err;
    }
};
/**
 * This function is to Validate, Update and set token in headers
 * @param {Object} req is an object
 * @param {String} res is an object
 * @param {function} next is a callback function
 */
const refreshAuthorization = async (req, res, next) => {
    try {
        const originalUrl = req.originalUrl;
        if (originalUrl.includes('/login') || originalUrl.includes('/signup')) {
            return next();
        }
        const token = req.headers.authorization;
        if (!token || _.isEmpty(token)) {
            const msg = 'Authorization token is required';
            throw new Error(msg);
        }
        const curTime = moment().valueOf();
        const expires = moment().add(enums.LOGIN_PARMS.SESSION_EXP_TIME, enums.LOGIN_PARMS.SESSION_EXP_TYPE).valueOf();
        const decodedData = await jwt.decode(token.split(' ')[1], enums.LOGIN_PARMS.jwtSecret);
        process.userContext = {
            'username': decodedData.username,
            'firstName': decodedData.firstName,
            'lastName': decodedData.lastName,
            'version': '1.0',
            'transactionId': uuid.v1()
        };
        if (decodedData.exp >= curTime) {
            decodedData.expStatus = false;
            const Authorization = await jwt.encode({
                username: decodedData.username,
                firstName: decodedData.firstName,
                lastName: decodedData.lastName,
                exp: expires
            }, enums.LOGIN_PARMS.jwtSecret);
            res.newToken = 'Bearer ' + Authorization;
            req.newHeader = decodedData;
        } else {
            throw new Error('Token is invalid.');
        }
        next();
    } catch (err) {
        err.message != 'undefined' ? err.message : 'Invalid token .';
        next(err);
    }
};



// Exporting the modules

module.exports = {
    authorization: authorization,
    saltGeneration: saltGeneration,
    passwordEncryption: passwordEncryption,
    refreshAuthorization: refreshAuthorization
};
