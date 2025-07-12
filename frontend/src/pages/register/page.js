"use client"
import React, { useState } from 'react';
import { User, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {isLogin ? 'Welcome Back!' : 'Join ReWear!'}
              </h1>
              <p className="text-gray-600">
                {isLogin 
                  ? 'Login to continue your sustainable fashion journey.'
                  : 'Start your sustainable fashion journey today.'
                }
              </p>
            </div>

            <div className="space-y-6">
              {/* Username/Email field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {isLogin ? 'Username' : 'Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {isLogin ? (
                      <User className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Mail className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <input
                    type={isLogin ? 'text' : 'email'}
                    name={isLogin ? 'username' : 'email'}
                    value={isLogin ? formData.username : formData.email}
                    onChange={handleInputChange}
                    placeholder={isLogin ? 'your_username' : 'your.email@example.com'}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Username field for signup */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="your_username"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Password field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password field for signup */}
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Remember me and Forgot password */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Remember me</span>
                  </label>
                  <button className="text-sm text-green-600 hover:text-green-800 transition-colors">
                    Forgot your password?
                  </button>
                </div>
              )}

              {/* Submit button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </div>

            {/* Toggle between login and signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={toggleAuthMode}
                  className="ml-1 text-green-600 hover:text-green-800 font-medium transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Login'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="hidden lg:flex flex-1 relative">
        <div className="w-full relative overflow-hidden">
          {/* Background Image */}
          <img 
            src="/img.png" 
            alt="Woman browsing clothes in organized closet" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0  bg-opacity-40"></div>
          
          {/* Content overlay */}
          <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-8">
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">ReWear</h2>
              <p className="text-xl text-green-100 font-medium drop-shadow-md">
                Community Clothing Exchange
              </p>
            </div>
            
            <div className="bg-green-500 bg-opacity-20 backdrop-blur-sm rounded-2xl p-8  border-opacity-30 max-w-md">
              <div className="text-white text-center mb-6">
                <h3 className="text-lg font-semibold mb-2">Sustainable Fashion</h3>
                <p className="text-sm text-green-100">
                  Exchange, reuse, and reduce textile waste through our community platform
                </p>
              </div>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-4  text-left">
                <div className="bg-green-400 bg-opacity-10 backdrop-blur-sm rounded-lg p-4  border-opacity-20">
                  <h4 className="text-white font-medium mb-1">Direct Swaps</h4>
                  <p className="text-green-100 text-sm">Exchange clothes directly with other users</p>
                </div>
                <div className="bg-green-400 bg-opacity-10 backdrop-blur-sm rounded-lg p-4  border-opacity-20">
                  <h4 className="text-white font-medium mb-1">Point System</h4>
                  <p className="text-green-100 text-sm">Earn points for donations and exchanges</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}