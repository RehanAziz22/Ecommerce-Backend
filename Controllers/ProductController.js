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
        }else{
            res.json({
                message: "No products found",
                status: false
            })
        }
    }
}

module.exports = productController;