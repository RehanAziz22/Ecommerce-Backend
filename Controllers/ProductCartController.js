const ProductCartModel = require("../Models/ProductCartSchema");
const ProductModel = require("../Models/ProductSchema");

const productCartController = {
  addProductToCart: async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      let cart = await ProductCartModel.findOne({ userId });

      if (!cart) {
        // If no cart exists, create a new one
        cart = new ProductCartModel({
          userId,
          items: [{ productId, quantity }],
          totalPrice: product.price * quantity,
        });
      } else {
        // If cart exists, update it
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
          // If product already exists, update quantity
          cart.items[itemIndex].quantity += quantity;
        } else {
          // If product doesn't exist, add it to cart
          cart.items.push({ productId, quantity });
        }
        cart.totalPrice += product.price * quantity;
      }

      await cart.save();
      res.status(200).json({ message: 'Product added to cart', cart });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  },
  removeProductFromCart: async (req, res) => {
    const { userId, productId } = req.body;
    console.log(req.body)
    try {
      const cart = await ProductCartModel.findOne({ userId })

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      console.log(cart)
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      console.log(itemIndex)


      if (itemIndex > -1) {
        const removedItem = cart.items[itemIndex];
        console.log('Removed Item:', removedItem);

        const product = await ProductModel.findById(productId)
        const priceToDeduct = removedItem.quantity * (product?.price || 0);
        console.log('Price to Deduct:', priceToDeduct);

        if (!Number.isFinite(priceToDeduct)) {
          return res.status(400).json({status:false, message: 'Invalid price or quantity in cart' });
        }

        cart.totalPrice = Math.max(cart.totalPrice - priceToDeduct, 0);
        cart.items.splice(itemIndex, 1);
      } else {
        return res.status(404).json({ status:false,message: 'Product not found in cart' });
      }

      await cart.save();
      res.status(200).json({status:true, message: 'Product removed from cart', cart });
    } catch (err) {
      res.status(500).json({ status:false, message: 'Internal Server Error', error: err.message });
    }
  },
  getCartDetails: async (req, res) => {
    const { userId } = req.params;

    try {
      const cart = await ProductCartModel.findOne({ userId }).populate('items.productId'); // Populate product details

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      res.status(200).json({ cart });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  },
  clearCart: async (req, res) => {
    const { userId } = req.body;

    try {
      const cart = await ProductCartModel.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      cart.items = []; // Clear items
      cart.totalPrice = 0; // Reset total price

      await cart.save();
      res.status(200).json({ message: 'Cart cleared successfully', cart });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  },
  updateProductQuantityInCart: async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try {
      if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than 0' });
      }

      const cart = await ProductCartModel.findOne({ userId });

      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        const product = await ProductModel.findById(productId);
        const oldQuantity = cart.items[itemIndex].quantity;

        cart.items[itemIndex].quantity = quantity;
        cart.totalPrice += (quantity - oldQuantity) * product.price; // Adjust total price
      } else {
        return res.status(404).json({ message: 'Product not found in cart' });
      }

      await cart.save();
      res.status(200).json({ message: 'Cart updated successfully', cart });
    } catch (err) {
      res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
  }
}

module.exports = productCartController;