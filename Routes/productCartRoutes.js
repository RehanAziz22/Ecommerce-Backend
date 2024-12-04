const express = require('express');
const ProductModel = require('../Models/ProductSchema');
const ProductCartModel = require('../Models/ProductCartSchema');
const productCartController = require('../Controllers/ProductCartController');

const router = express.Router();

// Add product to cart
router.post('/add', productCartController.addProductToCart);

// Remove product from cart
router.post('/remove', productCartController.removeProductFromCart);

  // Get cart details for a user
router.get('/:userId', productCartController.getCartDetails);
// Clear entire cart
router.post('/clear', productCartController.clearCart);
// Update quantity of a product in cart
router.post('/update', productCartController.updateProductQuantityInCart);
      
module.exports = router;
