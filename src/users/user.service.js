// Import required modules
const userCTRL = require('./user.controller');
const commonUtils = require('../../common/common');
const enums = require('../../common/enum');
const _ = require('lodash');
/**
 * This function is for user signUp
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const userSignUp = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new Error('Body parameters required.');
        }
        if (req.body && _.isEmpty(req.body)) {
            throw new Error('Request body should not be  empty.');
        }
        const userData = req.body;
        const userExist = await userCTRL.userFetch(userData.username);
        if (userExist !== null) {
            res.statusMessage = 'User already exists';
            res.status(400);
            res.json({ 'message': 'User already exists' });
            res.end();
        } else {
            const salt = await commonUtils.saltGeneration(enums.LOGIN_PARMS.SALT_SIZE);
            const passwordObj = await commonUtils.passwordEncryption(req.body.password, salt);
            const result = await userCTRL.userSignUp(passwordObj, userData);
            res.status(200);
            res.json({ 'message': 'User Signedup Succesfully', result });
            res.end();
        }
    } catch (err) {
        next(err);
    }
};

/**
 * This function is to login
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const login = async (req, res, next) => {
    try {
        if (!req.body && !req.body.username) {
            throw new Error('Username is required');
        }
        if (!req.body && !req.body.password) {
            throw new Error('Password is required');
        }
        const userObj = await userCTRL.userFetch(req.body.username);
        if (userObj === null) {
            res.statusMessage = 'Invalid username';
            res.status(400);
            res.end();
        } else {
            const passwordObj = await commonUtils.passwordEncryption(req.body.password, userObj.salt);
            if (passwordObj.passwordHash === userObj.password) {
                const token = await commonUtils.authorization(res, userObj);
                res.json({ 'message': 'success', 'Authorization': token });
                res.status(200);
                res.end();
            } else {
                res.statusMessage = 'Invalid password';
                res.status(400);
                res.end();
            }
        }
    } catch (err) {
        next(err);
    }
};
// export modules
module.exports = {
    signUp: userSignUp,
    login: login
};
