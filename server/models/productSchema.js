import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: 'Uncategorized'
    },
    price: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true,
    },
    sizes: {
        type: [String],
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        required: true,
    }
})

export default mongoose.model('Product', productSchema);