// Importing modules
const mongoose = require('mongoose');
const enums = require('../common/enum');
mongoose.connect(enums.MONGO_CFG.mongoURI, enums.DB_OPTIONS);

// defining schema for user model
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    password: { type: String, required: false },
    salt: { type: String, required: false },
    enableFlag: { type: Boolean, default: true },
    deletedFlag: { type: Boolean, default: false },
    createdBy: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true, default: new Date().toLocaleString() },
    updatedBy: { type: String, required: true, trim: true },
    updatedAt: { type: Date, required: true, default: new Date().toLocaleString() }
});
// Exporting schema
module.exports = mongoose.model(enums.TABLE.USERS, UserSchema);
