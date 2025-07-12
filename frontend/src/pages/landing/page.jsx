'use client';
import React, { useEffect, useState } from 'react';
import { Heart, Share2, User, MapPin, Clock, Leaf, Recycle, ArrowRight, Star, Shirt, Users, Globe, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { staticItems } from '@/config/staticData';

// Enhanced Carousel Component with Autoplay
const EnhancedCarousel = ({ items, autoplayInterval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoplayInterval, items.length]);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const getItemStyle = (index) => {
    const position = (index - currentIndex + items.length) % items.length;
    
    if (position === 0) {
      // Center item - active
      return {
        transform: 'translateX(0%) scale(1.0)',
        zIndex: 10,
        opacity: 1,
        filter: 'brightness(1)'
      };
    } else if (position === 1) {
      // Right item
      return {
        transform: 'translateX(80%) scale(0.85)',
        zIndex: 5,
        opacity: 0.7,
        filter: 'brightness(0.8)'
      };
    } else if (position === items.length - 1) {
      // Left item
      return {
        transform: 'translateX(-80%) scale(0.85)',
        zIndex: 5,
        opacity: 0.7,
        filter: 'brightness(0.8)'
      };
    } else {
      // Hidden items
      return {
        transform: 'translateX(0%) scale(0.7)',
        zIndex: 1,
        opacity: 0,
        filter: 'brightness(0.6)'
      };
    }
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Carousel Container */}
      <div 
        className="relative h-[500px] overflow-hidden px-4"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {items.map((item, index) => (
          <div
            key={item._id}
            className="absolute inset-0 transition-all duration-700 ease-in-out cursor-pointer"
            style={getItemStyle(index)}
            onClick={() => goToSlide(index)}
          >
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-green-100 h-full mx-4 max-w-sm">
              <div className="relative h-[350px] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x350/e5e7eb/9ca3af?text=Image+Not+Available';
                  }}
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-lg">
                    <Heart className="h-4 w-4 text-green-600" />
                  </button>
                  <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors shadow-lg">
                    <Share2 className="h-4 w-4 text-green-600" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                    Available
                  </span>
                </div>
              </div>
              <div className="p-6 h-[150px] flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 text-lg truncate">{item.title}</h3>
                  <p className="text-gray-600 mb-3 text-sm">Size: {item.size} | {item.condition}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-bold text-xl">{item.points} pts</span>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-3 rounded-full shadow-lg transition-all duration-200 z-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-green-600 p-3 rounded-full shadow-lg transition-all duration-200 z-20"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center space-x-2 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-green-600 scale-125' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Autoplay Indicator */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`text-sm px-4 py-2 rounded-full transition-colors ${
            isAutoPlaying 
              ? 'bg-green-100 text-green-700 hover:bg-green-200' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
        
        </button>
      </div>
    </div>
  );
};

const Card = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-100 hover:shadow-xl transition-shadow duration-200 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export default function LandingPage() {
  const [allItems, setAllItems] = useState(staticItems);
  const [category, setCategory] = useState('');

  useEffect(() => {
    // Simulate API call
    const fetchItems = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setAllItems(staticItems);
      } catch (err) {
        setAllItems(staticItems);
      }
    };
    fetchItems();
  }, [category]);

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
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="hover:text-green-200 transition-colors">Home</a>
              <a href="/browse" className="hover:text-green-200 transition-colors">Browse</a>
              <a href="/login" className="hover:text-green-200 transition-colors">Login</a>
              <a href="/signup" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition-colors">Sign Up</a>
            </nav>
            <div className="flex items-center space-x-4 md:hidden">
              <div className="flex items-center space-x-2 bg-white/20 px-3 py-1 rounded-full">
                <Recycle className="h-4 w-4" />
                <span className="text-sm">Sustainable</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Sustainable Fashion"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-emerald-700/80"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Swap, Style, <span className="text-green-200">Sustain</span>
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              Join a community dedicated to sustainable fashion. Exchange clothes directly or redeem points for new styles.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button className="bg-white text-green-600 font-semibold py-4 px-8 rounded-xl hover:bg-green-50 transition-colors duration-200 shadow-lg flex items-center space-x-2">
                <Sparkles className="h-5 w-5" />
                <span>Start Swapping</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>Browse Items</span>
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-8 rounded-xl transition-colors duration-200 shadow-lg flex items-center space-x-2">
                <Shirt className="h-5 w-5" />
                <span>List an Item</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-green-200">Items Swapped</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">5K+</div>
                <div className="text-green-200">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">98%</div>
                <div className="text-green-200">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose ReWear?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the future of sustainable fashion with our innovative platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 text-center hover:shadow-2xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Eco-Friendly</h3>
              <p className="text-gray-600">Reduce textile waste and contribute to a more sustainable future through clothing exchanges.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 text-center hover:shadow-2xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Community Driven</h3>
              <p className="text-gray-600">Connect with like-minded fashion enthusiasts and build lasting relationships.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 text-center hover:shadow-2xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Quality Assured</h3>
              <p className="text-gray-600">Every item is carefully reviewed to ensure you get the best quality clothing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Explore by Category</h2>
            <p className="text-lg text-gray-600">Find exactly what you're looking for</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {['Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Winter', 'Summer', 'Ethnic'].map((cat) => (
              <div
                key={cat}
                onClick={() => setCategory(cat)}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl shadow-lg p-6 text-center font-semibold hover:shadow-xl cursor-pointer transition-all duration-200 border-2 border-green-100 hover:border-green-200 hover:scale-105"
              >
                <div className="text-2xl mb-2">👕</div>
                <span className="text-gray-800">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Items Carousel */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Items</h2>
            <p className="text-lg text-gray-600">Discover amazing pieces from our community</p>
          </div>
          
          <EnhancedCarousel items={allItems} autoplayInterval={4000} />
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Refresh Your Wardrobe Sustainably?</h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Sign up now and start swapping! Explore a world of fashion that's good for your style and the planet.
          </p>
          <button className="bg-white text-green-600 font-semibold py-4 px-8 rounded-xl hover:bg-green-50 transition-colors duration-200 shadow-lg text-lg flex items-center space-x-2 mx-auto">
            <Users className="h-5 w-5" />
            <span>Join ReWear Today</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-6 w-6 text-green-400" />
                <span className="text-xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400">
                Making sustainable fashion accessible to everyone through community-driven clothing exchanges.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/browse" className="hover:text-white transition-colors">Browse Items</a></li>
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/product" className="hover:text-white transition-colors">List Item</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/help" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ReWear. All rights reserved. Made with ❤️ for sustainable fashion.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}