const { Schema, default: mongoose } = require("mongoose");

const reviewSchema = new Schema({
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    reviewerName: { type: String, required: true },
    reviewerEmail: { type: String, required: true },
});

const productSchema = new Schema({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    rating: { type: Number, required: true },
    stock: { type: Number, required: true },
    tags: [{ type: String }],
    brand: { type: String, required: true },
    sku: { type: String, required: true },
    weight: { type: Number, required: true },
    dimensions: {
        width: { type: Number, required: true },
        height: { type: Number, required: true },
        depth: { type: Number, required: true },
    },
    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },
    availabilityStatus: { type: String, required: true },
    reviews: [reviewSchema],
    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, required: true },
    meta: {
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
        barcode: { type: String, required: true },
        qrCode: { type: String, required: true },
    },
    images: [{ type: String }],
    thumbnail: { type: String, required: true },
}, { timestamps: true });

const ProductModel = mongoose.model("product", productSchema)
module.exports = ProductModel