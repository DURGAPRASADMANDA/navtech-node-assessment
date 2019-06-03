const Users = require('../../models/users.model');

/**
 * This function is to signup
 * @param {Object} passwordObj user password hash
 * @param {Object} body user data
 * @return {object} succuss response
 */
const userSignUp = async (passwordObj, body) => {
    try {
        const params = {
            password: passwordObj.passwordHash,
            salt: passwordObj.salt,
            firstName: body.firstName,
            lastName: body.lastName,
            username: body.username,
            createdBy: body.username,
            updatedBy: body.username
        };
        const obj = new Users(params);
        return await obj.save();
    } catch (err) {
        throw err;
    }
};

/**
 * This function is to fetch user
 * @param {string} username user name
 * @return {object} user object
 */
const userFetch = async (username) => {
    try {
        return await Users.findOne({ username: username });
    } catch (err) {
        throw err;
    }
};


// Export modules
module.exports = {
    userSignUp: userSignUp,
    userFetch: userFetch
};

