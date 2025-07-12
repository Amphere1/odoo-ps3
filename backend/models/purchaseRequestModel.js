import mongoose from "mongoose";

const purchaseRequestSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, "Product reference is required"]
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Buyer reference is required"]
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Seller reference is required"]
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'accepted', 'rejected', 'cancelled'],
            message: 'Status must be pending, accepted, rejected, or cancelled'
        },
        default: 'pending'
    },
    message: {
        type: String,
        trim: true,
        maxLength: [500, "Message cannot exceed 500 characters"]
    },
    offeredPrice: {
        type: Number,
        min: [0, "Offered price cannot be negative"]
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
        min: [1, "Quantity must be at least 1"],
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    respondedAt: {
        type: Date
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
purchaseRequestSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Index for better query performance
purchaseRequestSchema.index({ seller: 1, status: 1 });
purchaseRequestSchema.index({ buyer: 1, status: 1 });
purchaseRequestSchema.index({ product: 1 });
purchaseRequestSchema.index({ createdAt: -1 });

const PurchaseRequest = mongoose.model('PurchaseRequest', purchaseRequestSchema);

export default PurchaseRequest;
