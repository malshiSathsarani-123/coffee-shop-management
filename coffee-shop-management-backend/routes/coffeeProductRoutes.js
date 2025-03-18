const express = require('express');
const multer = require('multer');
const path = require('path');
const coffeeProductController = require('../controller/coffeeProductController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage: storage });

router.post('/create',authMiddleware, upload.single('image'), coffeeProductController.createCoffeeProduct);
router.get('/get', coffeeProductController.getCoffeeProducts);
router.get('/getByCategory', coffeeProductController.getProductsByCategory);
router.get('/getBySubCategory', coffeeProductController.getProductsBySubCategory);
router.get('/getById/:id', coffeeProductController.getProductById);
router.put('/update',authMiddleware, upload.single('image'), coffeeProductController.updateCoffeeProduct);
router.delete('/delete/:id',authMiddleware, adminMiddleware, coffeeProductController.deleteCoffeeProduct);
module.exports = router;
