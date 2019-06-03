// Import required modules
const express = require('express');
const router = new express.Router();
const ordersSRVC = require('./orders.service');
// URLs
const routes = () => {
    router.route('/orders')
        .get(ordersSRVC.fetchOrders)
        .post(ordersSRVC.insertOrders)
    router.route('/orders/:orderNo')
        .put(ordersSRVC.updateOrder)
        .delete(ordersSRVC.deleteOrder);
    return router;
};
// Exporting routes
module.exports = routes;
