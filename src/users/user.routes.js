// Import required modules
const express = require('express');
const router = new express.Router();
const userSRVC = require('./user.service');
const commonUtils = require('../../common/common');
// URLs
const routes = () => {
    router.use(commonUtils.refreshAuthorization, (req, res, next) => {
        next();
    });
    router.route('/signup')
        .post(userSRVC.signUp);
    router.route('/login')
        .post(userSRVC.login);
    return router;
};
// Export routes
module.exports = routes;
