// Import required modules
const util = require('util');
const Orders = require('../../models/orders.model');
/**
 * This function is to fetch Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const fetchOrders = async () => {
    try {
        return await Orders.find();
    } catch (err) {
        throw err;
    }
};
/**
 * This function is to insert Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const insertOrders = async (req, res, next) => {
    try {
        // --------------------------
        // Unique Random ORDER number
        // --------------------------
        req.body.orderNumber = 'ORDR-' + new Date().getTime();
        req.body.createdBy = process.userContext.username;
        req.body.updatedBy = process.userContext.username;
        const obj = new Orders(req.body);
        return await obj.save();
    } catch (err) {
        throw err;
    }
};

/**
 * This function is to insert Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const updateOrder = async (req, res, next) => {
    try {
        const orderNo = req.params.orderNo;
        return await Orders.findOneAndUpdate({ orderNumber: orderNo },
            {
                $set: {
                    'orderDueDate': req.body.orderDueDate,
                    'updatedBy': new Date().toLocaleString(),
                    'customerBuyerName': req.body.customerBuyerName,
                    'customerPhone': req.body.customerPhone,
                    'orderTotal': req.body.orderTotal,
                    'updatedBy': process.userContext.username,
                    'customerAddress.addressLine1' : req.body.customerAddress.addressLine1,
                    'customerAddress.addressLine2' : req.body.customerAddress.addressLine2,
                    'customerAddress.city' : req.body.customerAddress.city,
                    'customerAddress.state' : req.body.customerAddress.state,
                    'customerAddress.ZIP' : req.body.customerAddress.ZIP,
                    'customerAddress.country' : req.body.customerAddress.country,
                }
            }
            , { new: true });
    } catch (err) {
        throw err;
    }
};

/**
 * This function is to delete Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const deleteOrder = async (req, res, next) => {
    try {
        const orderNo = req.params.orderNo;
        return await Orders.findOneAndDelete({ orderNumber: orderNo });
    } catch (err) {
        throw err;
    }
};
module.exports = {
    fetchOrders: fetchOrders,
    insertOrders: insertOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
};
