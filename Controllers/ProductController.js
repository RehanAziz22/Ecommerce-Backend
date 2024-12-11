const ProductModel = require("../Models/ProductSchema")

const productController = {
    getAllProducts: async (req, res) => {
        const product = await ProductModel.find()

        if (product.length > 0) {
            res.json({
                message: "Products found",
                data: product,
                status: true
            })
        } else {
            res.json({
                message: "No products found",
                status: false
            })
        }
    },
    getSingleProduct: async (req, res) => {
        const { id } = req.params

        const product = await ProductModel.findById(id)

        if (!product) {
            res.json({
                message: "Product not found",
                status: false
            })
        } else {
            res.json({
                message: "Product found",
                data: product,
                status: true
            })
        }
    },

    // Add a review to a product
    addReview: async (req, res) => {
  
            const { id } = req.params;
            const { reviewerName, reviewerEmail, rating, comment } = req.body;
            console.log(req.body);

            const product = await ProductModel.findById(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }

            const newReview = {
                reviewerName,
                reviewerEmail,
                rating,
                comment,
                date: new Date(),
            };

            product.reviews.push(newReview);
            await product.save();

            res.status(200).json({ message: "Review added successfully", review: newReview });
    }
}

module.exports = productController;