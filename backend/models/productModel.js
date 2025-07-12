import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true,
        maxLength: [200, "Product title cannot exceed 200 characters"]
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
        trim: true,
        maxLength: [2000, "Product description cannot exceed 2000 characters"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        trim: true,
        enum: {
            values: [
                'Electronics',
                'Clothing',
                'Home & Garden',
                'Sports & Outdoors',
                'Books',
                'Toys & Games',
                'Health & Beauty',
                'Automotive',
                'Food & Beverages',
                'Art & Crafts',
                'Other'
            ],
            message: 'Please select a valid category'
        }
    },
    type: {
        type: String,
        required: [true, "Product type is required"],
        trim: true,
        maxLength: [100, "Product type cannot exceed 100 characters"]
    },
    size: {
        type: String,
        trim: true,
        enum: {
            values: [
                'XS',
                'S',
                'M',
                'L',
                'XL',
                'XXL',
                'One Size',
                'Custom',
                'Not Applicable'
            ],
            message: 'Please select a valid size'
        },
        default: 'Not Applicable'
    },
    condition: {
        type: String,
        required: [true, "Product condition is required"],
        enum: {
            values: [
                'New',
                'Like New',
                'Very Good',
                'Good',
                'Acceptable',
                'Poor'
            ],
            message: 'Please select a valid condition'
        }
    },
    tags: [{
        type: String,
        trim: true,
        lowercase: true,
        maxLength: [50, "Each tag cannot exceed 50 characters"]
    }],
    currency: {
        type: String,
        default: 'USD',
        uppercase: true,
        maxLength: [3, "Currency code should be 3 characters"]
    },
    inStock: {
        type: Boolean,
        default: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: [0, "Quantity cannot be negative"]
    },
    images: [{
        type: String,
        trim: true
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Seller information is required"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
productSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

// Create indexes for better query performance
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ condition: 1 });
productSchema.index({ price: 1 });
productSchema.index({ seller: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.model('Product', productSchema);

export default Product;