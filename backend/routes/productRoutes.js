const express = require('express');
const router = express.Router();
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');

router.get('/', getProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID
router.post('/', createProduct); // Create new product
router.put('/:id', updateProduct); // Update product
router.delete('/:id', deleteProduct); // Delete product

module.exports = router;
const productValidation = require('../middleware/validationMiddleware');

router.post('/', productValidation, createProduct); // Create new product with validation
router.put('/:id', productValidation, updateProduct); // Update product with validation
