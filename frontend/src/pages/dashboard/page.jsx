'use client';
import React, { useState } from 'react';
import { Heart, Share2, User, MapPin, Clock, Leaf, Recycle, Plus, Edit, Trash2 } from 'lucide-react';
import { userProfile, myListings, mySwaps } from '@/config/staticData'; // Assuming you have a userData config file

export default function DashboardPage() {
  const [activeSwapTab, setActiveSwapTab] = useState('ongoing');

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
          <span>Home</span> / <span className="font-medium">Dashboard</span>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 mb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-green-100 shadow-lg object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-600 text-white rounded-full p-2 shadow-lg">
                <User className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{userProfile.name}</h2>
              <p className="text-gray-600 mb-1">{userProfile.email}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Member since {userProfile.memberSince}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">⭐ {userProfile.rating}/5 rating • {userProfile.stats.swaps} successful swaps</p>
              
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-2xl font-bold text-green-600">{userProfile.points} Points</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active Member
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                  <p className="text-sm text-green-600 font-medium">Total Listings</p>
                  <p className="text-2xl font-bold text-green-700">{userProfile.stats.listings}</p>
                </div>
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-xl border border-emerald-200">
                  <p className="text-sm text-emerald-600 font-medium">Total Swaps</p>
                  <p className="text-2xl font-bold text-emerald-700">{userProfile.stats.swaps}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* My Listings */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">My Listings</h3>
            <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors duration-200 shadow-lg flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Add New Item</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {myListings.map((item) => (
              <div key={item._id} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-100 hover:shadow-xl transition-shadow duration-200">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button className="bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors">
                      <Edit className="h-3 w-3 text-green-600" />
                    </button>
                    <button className="bg-white/80 p-1.5 rounded-full hover:bg-white transition-colors">
                      <Trash2 className="h-3 w-3 text-red-600" />
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-green-600 font-semibold">{item.points} Points</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* My Swaps */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">My Swaps</h3>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveSwapTab('ongoing')}
                className={`px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
                  activeSwapTab === 'ongoing'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
                }`}
              >
                Ongoing
              </button>
              <button
                onClick={() => setActiveSwapTab('completed')}
                className={`px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
                  activeSwapTab === 'completed'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-green-600 border border-green-200 hover:bg-green-50'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mySwaps[activeSwapTab].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-100 hover:shadow-xl transition-shadow duration-200">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    {activeSwapTab === 'ongoing' ? 'Swapping with:' : 'Swapped with:'} {item.swapPartner}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}