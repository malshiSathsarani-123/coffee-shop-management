const express = require('express');
const router = express.Router();
const customerController = require('../controller/customer_controller');

router.post('/saveCustomer', customerController.saveCustomer);
router.get('/', customerController.getCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
