const Router = require('express');
const router = Router();
const OrderController = require('../controller/orderController');


router.get('/orders', OrderController.checkOrders)

//checkout
router.post('/order/checkout', OrderController.Checkout);

module.exports = router