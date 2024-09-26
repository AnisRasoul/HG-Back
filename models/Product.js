const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    front_view: {
        type: String,
        required: true, // Consider making this required if every product should have a front view
    },
    back_view: {
        type: String,
        required: true, // Consider making this required if every product should have a back view
    },
    detail_images: {
        type: [String],
        default: [], // Default to an empty array if no detail images are provided
    }
});

const ProductSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    images: {
        type: ImageSchema,
        required: true, // Consider making the entire images object required
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update updated_at field on save
ProductSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Product', ProductSchema);
