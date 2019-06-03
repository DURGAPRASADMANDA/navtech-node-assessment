// Importing modules
const mongoose = require('mongoose');
const enums = require('../common/enum');
mongoose.connect(enums.MONGO_CFG.mongoURI, enums.DB_OPTIONS);

// defining schema for orders model
const OrdersSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true, unique: true, trim: true },
    orderDueDate: { type: Date, required: true },
    customerBuyerName: { type: String, required: true, trim: true },
    customerAddress: {
        addressLine1: { type: String, required: true, trim: true },
        addressLine2: { type: String, required: false, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        ZIP: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true }
    },
    customerPhone: { type: String, required: true },
    orderTotal: { type: Number, required: true },
    deletedFlag: { type: Boolean, default: false }, // For soft delete
    createdBy: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true, default: new Date().toLocaleString() },
    updatedBy: { type: String, required: true, trim: true },
    updatedAt: { type: Date, required: true, default: new Date().toLocaleString() }
});
// Exporting schema
module.exports = mongoose.model(enums.TABLE.ORDERS, OrdersSchema);
