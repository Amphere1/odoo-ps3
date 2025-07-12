'use client';
import React, { useState } from 'react';
import { Heart, Share2, User, MapPin, Clock, Leaf, Recycle, Search, Filter, Grid, List, Plus, Upload, X, Star, Eye, MessageCircle, ShoppingBag, Home, UserCircle, Settings, LogOut } from 'lucide-react';
import { mockItems } from '@/config/staticData';
const ReWearPlatform = () => {
  const [currentPage, setCurrentPage] = useState('browse');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedSize, setSelectedSize] = useState('All Sizes');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const categories = [
  "All Categories",
  "Women's Tops",
  "Women's Dresses",
  "Women's Outerwear",
  "Women's Sweaters",
  "Women's Shoes",
  "Men's Shirts",
  "Men's Pants",
  "Men's Outerwear",
  "Accessories"
];

const sizes = ["All Sizes", "XS", "S", "M", "L", "XL", "XXL", "6", "7", "8", "9", "10", "11", "12"];
const conditions = ["All Conditions", "Excellent", "Very Good", "Good", "Fair"];
  // Add Item Form State
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: '',
    size: '',
    condition: '',
    tags: '',
    images: []
  });
  const [dragActive, setDragActive] = useState(false);

  // Filter items based on search and filters
  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || item.category === selectedCategory;
    const matchesSize = selectedSize === 'All Sizes' || item.size === selectedSize;
    const matchesCondition = selectedCondition === 'All Conditions' || item.condition === selectedCondition;
    
    return matchesSearch && matchesCategory && matchesSize && matchesCondition;
  });

  const Header = () => (
    <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Leaf className="h-8 w-8" />
              <h1 className="text-2xl font-bold">ReWear</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => setCurrentPage('browse')}
                className={`px-3 py-2 rounded-lg transition-colors ${currentPage === 'browse' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                Browse Items
              </button>
              <button 
                onClick={() => setCurrentPage('add')}
                className={`px-3 py-2 rounded-lg transition-colors ${currentPage === 'add' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                Add Item
              </button>
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className={`px-3 py-2 rounded-lg transition-colors ${currentPage === 'dashboard' ? 'bg-white/20' : 'hover:bg-white/10'}`}
              >
                Dashboard
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
              <Recycle className="h-4 w-4" />
              <span className="text-sm">1,250 Points</span>
            </div>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <UserCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const BrowseItems = () => (
    <div className="max-w-7xl mx-auto p-6">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-green-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 bg-white border border-green-200 rounded-xl hover:bg-green-50 transition-colors"
            >
              <Filter className="h-5 w-5 text-green-600" />
              <span>Filters</span>
            </button>
            <div className="flex border border-green-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-600'} hover:bg-green-50 transition-colors`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'bg-white text-gray-600'} hover:bg-green-50 transition-colors`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={selectedCondition}
                  onChange={(e) => setSelectedCondition(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6 flex justify-between items-center">
        <p className="text-gray-600">
          Showing {filteredItems.length} of {mockItems.length} items
        </p>
        <select className="p-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Sort by: Most Recent</option>
          <option>Sort by: Price (Low to High)</option>
          <option>Sort by: Price (High to Low)</option>
          <option>Sort by: Rating</option>
        </select>
      </div>

      {/* Items Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-100 hover:shadow-xl transition-all duration-200 cursor-pointer ${
              viewMode === 'list' ? 'flex' : ''
            }`}
            onClick={() => setSelectedItem(item)}
          >
            <div className={`relative ${viewMode === 'list' ? 'w-48' : ''}`}>
              <img
                src={item.image}
                alt={item.title}
                className={`${viewMode === 'list' ? 'w-full h-32' : 'w-full h-48'} object-cover`}
              />
              {!item.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold">SWAPPED</span>
                </div>
              )}
              <div className="absolute top-2 right-2 flex space-x-1">
                <button className="bg-white/80 p-1 rounded-full hover:bg-white transition-colors">
                  <Heart className="h-4 w-4 text-green-600" />
                </button>
                <button className="bg-white/80 p-1 rounded-full hover:bg-white transition-colors">
                  <Share2 className="h-4 w-4 text-green-600" />
                </button>
              </div>
            </div>
            
            <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                <span className="text-green-600 font-bold text-lg">{item.points}p</span>
              </div>
              
              <div className="text-sm text-gray-600 space-y-1">
                <p>{item.category} • Size {item.size}</p>
                <p>Condition: {item.condition}</p>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{item.uploader}</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1">{item.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3" />
                  <span>{item.location}</span>
                </div>
              </div>

              {viewMode === 'list' && (
                <div className="flex space-x-2 mt-4">
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Swap Request
                  </button>
                  <button className="flex-1 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                    Use Points
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No items found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );

  const AddItemPage = () => {
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === 'dragenter' || e.type === 'dragover') {
        setDragActive(true);
      } else if (e.type === 'dragleave') {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      
      const files = Array.from(e.dataTransfer.files);
      handleFiles(files);
    };

    const handleFiles = (files) => {
      const imageFiles = files.filter(file => file.type.startsWith('image/'));
      const imageUrls = imageFiles.map(file => URL.createObjectURL(file));
      setNewItem(prev => ({
        ...prev,
        images: [...prev.images, ...imageUrls]
      }));
    };

    const removeImage = (index) => {
      setNewItem(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    };

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Add New Item</h2>
          
          <form className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Photos (Upload up to 5 images)
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-green-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">
                  Drag and drop images here, or{' '}
                  <label className="text-green-600 hover:text-green-700 cursor-pointer font-medium">
                    browse files
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFiles(Array.from(e.target.files))}
                    />
                  </label>
                </p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
              </div>
              
              {newItem.images.length > 0 && (
                <div className="grid grid-cols-5 gap-4 mt-4">
                  {newItem.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-green-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Title</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Vintage Floral Blouse"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Category</option>
                  {categories.slice(1).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select
                  value={newItem.size}
                  onChange={(e) => setNewItem(prev => ({ ...prev, size: e.target.value }))}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Size</option>
                  {sizes.slice(1).map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                <select
                  value={newItem.condition}
                  onChange={(e) => setNewItem(prev => ({ ...prev, condition: e.target.value }))}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select Condition</option>
                  {conditions.slice(1).map(condition => (
                    <option key={condition} value={condition}>{condition}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={newItem.description}
                onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Describe your item in detail. Include material, measurements, care instructions, and any notable features..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={newItem.tags}
                onChange={(e) => setNewItem(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., vintage, floral, cotton, summer"
              />
            </div>

            {/* Sustainability Info */}
            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <h3 className="font-semibold text-green-800 mb-2">Sustainability Impact</h3>
              <p className="text-sm text-green-700">
                By listing this item, you're contributing to sustainable fashion and helping reduce textile waste. 
                Each swap saves approximately 2,700 liters of water and reduces CO2 emissions by 6.7 kg.
              </p>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-4">
              <button
                type="button"
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="flex-1 bg-green-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-green-700 transition-colors shadow-lg"
              >
                List Item
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ItemDetailModal = ({ item, onClose }) => {
    if (!item) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{item.title}</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
              </div>

              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-2xl font-bold text-green-600">{item.points} Points</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.available ? 'Available' : 'Swapped'}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Category:</span>
                    <span className="text-gray-600">{item.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Size:</span>
                    <span className="text-gray-600">{item.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Condition:</span>
                    <span className="text-gray-600">{item.condition}</span>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-xl mb-6">
                  <h3 className="font-semibold text-gray-800 mb-2">Uploader</h3>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.uploader}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.rating}/5</span>
                        <span>•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-xl hover:bg-green-700 transition-colors">
                    Send Swap Request
                  </button>
                  <button className="flex-1 bg-emerald-600 text-white py-3 px-6 rounded-xl hover:bg-emerald-700 transition-colors">
                    Redeem with Points
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header />
      
      <main>
        {currentPage === 'browse' && <BrowseItems />}
        {currentPage === 'add' && <AddItemPage />}
        {currentPage === 'dashboard' && (
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Total Points</h3>
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <Recycle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600">1,250</div>
                <p className="text-sm text-gray-600">+50 this week</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Items Listed</h3>
                  <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-600">12</div>
                <p className="text-sm text-gray-600">3 available</p>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Successful Swaps</h3>
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-600">23</div>
                <p className="text-sm text-gray-600">4.8/5 rating</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                      <Plus className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">New item listed</p>
                      <p className="text-sm text-gray-600">Vintage Floral Blouse • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Swap request received</p>
                      <p className="text-sm text-gray-600">Designer Denim Jacket • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-3 bg-emerald-50 rounded-lg">
                    <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                      <Recycle className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Points earned</p>
                      <p className="text-sm text-gray-600">+150 points from completed swap • 2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Your Impact</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">💧</span>
                      </div>
                      <span className="font-medium text-gray-800">Water Saved</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">62,100L</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">🌱</span>
                      </div>
                      <span className="font-medium text-gray-800">CO2 Reduced</span>
                    </div>
                    <span className="text-lg font-bold text-gray-600">154kg</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <Recycle className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-800">Items Diverted</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">23</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    🌟 Eco Warrior Badge Earned! You've diverted 20+ items from landfills.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {selectedItem && (
        <ItemDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default ReWearPlatform;