import express from 'express';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import PurchaseRequest from '../models/purchaseRequestModel.js';
import verifyToken from '../middleware/auth.js';

const router = express.Router();

// POST route to create a new product listing
router.post('/create-listing', verifyToken, async (req, res) => {
    try {
        const {
            title,
            description,
            category,
            type,
            size,
            condition,
            tags,
            quantity,
            images
        } = req.body;

        // Get sellerId from authenticated user
        const sellerId = req.user._id;

        // Validate required fields
        if (!title || !description || !category || !type || !condition) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, description, category, type, and condition are required'
            });
        }

        // Check if seller exists
        const seller = await User.findById(sellerId);
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: 'Seller not found'
            });
        }

        // Create new product
        const newProduct = new Product({
            title,
            description,
            category,
            type,
            size: size || 'Not Applicable',
            condition,
            tags: tags || [],
            quantity: quantity || 1,
            images: images || [],
            seller: sellerId
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Update the seller's mylistings array
        await User.findByIdAndUpdate(
            sellerId,
            { 
                $push: { mylistings: savedProduct._id },
                UpdatedAt: Date.now()
            },
            { new: true }
        );

        // Populate seller information in the response
        const populatedProduct = await Product.findById(savedProduct._id)
            .populate('seller', 'username email');

        res.status(201).json({
            success: true,
            message: 'Product listing created successfully',
            product: populatedProduct
        });

    } catch (error) {
        console.error('Error creating product listing:', error);
        
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: validationErrors
            });
        }

        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET route to fetch all products for marketplace
router.get('/marketplace', verifyToken, async (req, res) => {
    try {
        const { 
            category, 
            condition, 
            minPrice, 
            maxPrice, 
            search, 
            page = 1, 
            limit = 20 
        } = req.query;

        // Build filter object
        const filter = { inStock: true };

        if (category) filter.category = category;
        if (condition) filter.condition = condition;
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Build search query
        let query = Product.find(filter);

        // Add text search if search term provided
        if (search) {
            query = query.find({
                $text: { $search: search }
            });
        }

        // Add pagination
        const skip = (page - 1) * limit;
        query = query
            .populate('seller', 'username email')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        const products = await query;
        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            products,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                hasNextPage: page * limit < totalProducts,
                hasPrevPage: page > 1
            }
        });

    } catch (error) {
        console.error('Error fetching marketplace products:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET route to fetch user's listings
router.get('/my-listings', verifyToken, async (req, res) => {
    try {
        // Use authenticated user's ID
        const userId = req.user._id;

        // Check if user exists
        const user = await User.findById(userId).populate({
            path: 'mylistings',
            options: { sort: { createdAt: -1 } }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.status(200).json({
            success: true,
            listings: user.mylistings
        });

    } catch (error) {
        console.error('Error fetching user listings:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// POST route to create a purchase request (buy request)
router.post('/buy-request', verifyToken, async (req, res) => {
    try {
        const {
            productId,
            message,
            offeredPrice,
            quantity = 1
        } = req.body;

        // Get buyerId from authenticated user
        const buyerId = req.user._id;

        // Validate required fields
        if (!productId) {
            return res.status(400).json({
                success: false,
                message: 'Product ID is required'
            });
        }

        // Check if product exists and is available
        const product = await Product.findById(productId).populate('seller', 'username email');
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (!product.inStock) {
            return res.status(400).json({
                success: false,
                message: 'Product is not available for purchase'
            });
        }

        if (product.quantity < quantity) {
            return res.status(400).json({
                success: false,
                message: `Only ${product.quantity} items available, but ${quantity} requested`
            });
        }

        // Prevent seller from buying their own product
        if (product.seller._id.toString() === buyerId) {
            return res.status(400).json({
                success: false,
                message: 'You cannot buy your own product'
            });
        }

        // Check if there's already a pending request for this product from this buyer
        const existingRequest = await PurchaseRequest.findOne({
            product: productId,
            buyer: buyerId,
            status: 'pending'
        });

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: 'You already have a pending request for this product'
            });
        }

        // Create purchase request
        const purchaseRequest = new PurchaseRequest({
            product: productId,
            buyer: buyerId,
            seller: product.seller._id,
            message: message || '',
            offeredPrice: offeredPrice || product.price,
            quantity
        });

        const savedRequest = await purchaseRequest.save();

        // Populate the request with product and buyer details
        const populatedRequest = await PurchaseRequest.findById(savedRequest._id)
            .populate('product', 'title price images')
            .populate('buyer', 'username email')
            .populate('seller', 'username email');

        res.status(201).json({
            success: true,
            message: 'Purchase request sent successfully',
            purchaseRequest: populatedRequest
        });

    } catch (error) {
        console.error('Error creating purchase request:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET route to fetch pending purchase requests for a seller
router.get('/purchase-requests', verifyToken, async (req, res) => {
    try {
        // Use authenticated user as seller
        const sellerId = req.user._id;
        const { status = 'pending' } = req.query;

        // Fetch purchase requests
        const requests = await PurchaseRequest.find({
            seller: sellerId,
            status: status
        })
        .populate('product', 'title price images condition')
        .populate('buyer', 'username email')
        .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {
        console.error('Error fetching purchase requests:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// PUT route to respond to purchase request (accept/reject)
router.put('/purchase-request/:requestId/respond', verifyToken, async (req, res) => {
    try {
        const { requestId } = req.params;
        const { action } = req.body; // action: 'accept' or 'reject'
        
        // Get sellerId from authenticated user
        const sellerId = req.user._id;

        // Validate action
        if (!['accept', 'reject'].includes(action)) {
            return res.status(400).json({
                success: false,
                message: 'Action must be either "accept" or "reject"'
            });
        }

        // Find the purchase request
        const purchaseRequest = await PurchaseRequest.findById(requestId)
            .populate('product')
            .populate('buyer', 'username email myPurchases')
            .populate('seller', 'username email mylistings');

        if (!purchaseRequest) {
            return res.status(404).json({
                success: false,
                message: 'Purchase request not found'
            });
        }

        // Verify the seller is the one responding
        if (purchaseRequest.seller._id.toString() !== sellerId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to respond to this request'
            });
        }

        // Check if request is still pending
        if (purchaseRequest.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'This request has already been responded to'
            });
        }

        // Update request status
        purchaseRequest.status = action === 'accept' ? 'accepted' : 'rejected';
        purchaseRequest.respondedAt = new Date();
        await purchaseRequest.save();

        // If accepted, transfer the product
        if (action === 'accept') {
            const product = purchaseRequest.product;
            const buyer = purchaseRequest.buyer;
            const seller = purchaseRequest.seller;

            // Check if product is still available
            if (!product.inStock || product.quantity < purchaseRequest.quantity) {
                // Revert the request status
                purchaseRequest.status = 'pending';
                purchaseRequest.respondedAt = null;
                await purchaseRequest.save();

                return res.status(400).json({
                    success: false,
                    message: 'Product is no longer available in the requested quantity'
                });
            }

            // Update product quantity or mark as out of stock
            if (product.quantity === purchaseRequest.quantity) {
                product.inStock = false;
                product.quantity = 0;
                
                // Remove from seller's listings
                await User.findByIdAndUpdate(
                    seller._id,
                    { 
                        $pull: { mylistings: product._id },
                        UpdatedAt: Date.now()
                    }
                );
            } else {
                product.quantity -= purchaseRequest.quantity;
            }
            await product.save();

            // Add to buyer's purchases
            await User.findByIdAndUpdate(
                buyer._id,
                { 
                    $push: { myPurchases: product._id },
                    UpdatedAt: Date.now()
                }
            );

            // Update seller's points (optional reward system)
            await User.findByIdAndUpdate(
                seller._id,
                { 
                    $inc: { points: 10 }, // Award 10 points for successful sale
                    UpdatedAt: Date.now()
                }
            );
        }

        // Populate the updated request
        const updatedRequest = await PurchaseRequest.findById(requestId)
            .populate('product', 'title price images')
            .populate('buyer', 'username email')
            .populate('seller', 'username email');

        res.status(200).json({
            success: true,
            message: `Purchase request ${action}ed successfully`,
            purchaseRequest: updatedRequest
        });

    } catch (error) {
        console.error('Error responding to purchase request:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

// GET route to fetch buyer's purchase requests
router.get('/my-requests', verifyToken, async (req, res) => {
    try {
        // Use authenticated user as buyer
        const buyerId = req.user._id;
        const { status } = req.query; // Optional filter by status

        // Build filter
        const filter = { buyer: buyerId };
        if (status) filter.status = status;

        // Fetch purchase requests
        const requests = await PurchaseRequest.find(filter)
            .populate('product', 'title price images condition')
            .populate('seller', 'username email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            requests
        });

    } catch (error) {
        console.error('Error fetching buyer requests:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});

export default router;