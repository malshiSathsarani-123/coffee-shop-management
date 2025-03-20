const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');

router.post('/save', orderController.placeOrder);
router.get('/orderById/:id', orderController.getByOrderId);
router.put('/updateStatus/:id/:status', orderController.updateStatus);
router.get('/getAll', orderController.getAll);
router.delete('/delete/:id', orderController.deleteByOrderId);

module.exports = router;


