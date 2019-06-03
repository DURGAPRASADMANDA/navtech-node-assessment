// Import required modules
const util = require('util');
const orderCTRL = require('./orders.controller');
const commonUtils = require('../../common/common');

/**
 * This function is to fetch Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const fetchOrders = async (req, res, next) => {
    try {
        const result = await orderCTRL.fetchOrders();
        res.json({ 'message': 'Order inserted successfully', 'results': result });
        res.status(200);
        res.end();
    } catch (err) {
        next(err);
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
        const result = await orderCTRL.insertOrders(req, res, next);
        res.json({ 'message': 'Order fetched successfully', 'results': result });
        res.status(200);
        res.end();
    } catch (err) {
        next(err);
    }
};
/**
 * This function is to Update Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const updateOrder = async (req, res, next) => {
    try {
        if (!req.params && !req.params.orderNo) {
            throw new Error('Order number is required');
        }
        const result = await orderCTRL.updateOrder(req, res, next);
        res.json({ 'message': 'Order updated successfully', 'results': result });
        res.status(200);
        res.end();
    } catch (err) {
        next(err);
    }
};

/**
 * This function is to Delete Orders
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @param {function} next callback function
 */
const deleteOrder = async (req, res, next) => {
    try {
        if (!req.params && !req.params.orderNo) {
            throw new Error('Order number is required');
        }
        const result = await orderCTRL.deleteOrder(req, res, next);
        res.json({ 'message': 'Order deleted successfully'});
        res.status(200);
        res.end();
    } catch (err) {
        next(err);
    }
};
module.exports = {
    fetchOrders: fetchOrders,
    insertOrders: insertOrders,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
};