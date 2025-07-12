'use client'
import React, { useState } from 'react';
import { Heart, Share2, User, MapPin, Clock, Leaf, Recycle } from 'lucide-react';
import {productImages, previousListings} from '@/config/productData'
const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isAvailable, setIsAvailable] = useState(true);


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8" />
              <h1 className="text-3xl font-bold">ReWear</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <Recycle className="h-4 w-4" />
                <span className="text-sm">Sustainable Fashion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-green-600">
          <span>Home</span> / <span>Women's Clothing</span> / <span className="font-medium">Vintage Floral Blouse</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Image Gallery */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-100">
              <div className="relative">
                <img 
                  src={productImages[selectedImage]} 
                  alt="Product" 
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                    <Heart className="h-5 w-5 text-green-600" />
                  </button>
                  <button className="bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
                    <Share2 className="h-5 w-5 text-green-600" />
                  </button>
                </div>
              </div>
              
              {/* Thumbnail Images */}
              <div className="p-4 grid grid-cols-4 gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`Product ${index + 1}`} 
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Vintage Floral Blouse</h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-green-600">150 Points</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {isAvailable ? 'Available' : 'Swapped'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  Beautiful vintage-inspired floral blouse in excellent condition. Made from 100% cotton with a comfortable, breathable fabric. 
                  Features a classic collar, button-front closure, and elegant floral print. Perfect for both casual and semi-formal occasions. 
                  This piece has been lovingly worn and is ready for its next adventure in sustainable fashion.
                </p>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Size:</span>
                    <span className="text-gray-600">Medium</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Condition:</span>
                    <span className="text-gray-600">Excellent</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Material:</span>
                    <span className="text-gray-600">100% Cotton</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="text-gray-600">Women's Tops</span>
                  </div>
                </div>
              </div>

              {/* Uploader Info */}
              <div className="mb-8 bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Uploader Information</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Sarah Johnson</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>Member since 2023</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">⭐ 4.8/5 rating • 23 successful swaps</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg">
                  Send Swap Request
                </button>
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 shadow-lg">
                  Redeem with Points
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Previous Listings */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Previous Listings from Sarah</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {previousListings.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-100 hover:shadow-xl transition-shadow duration-200">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Previously swapped</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;