
export // Mock data for featured items
const staticItems = [
  {
    _id: '1',
    title: 'Vintage Denim Jacket',
    size: 'M',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1544966503-7cc531c3e7e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    points: 150
  },
  {
    _id: '2',
    title: 'Elegant Summer Dress',
    size: 'S',
    condition: 'Like New',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    points: 200
  },
  {
    _id: '3',
    title: 'Casual Cotton T-Shirt',
    size: 'L',
    condition: 'Good',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    points: 80
  },
  {
    _id: '4',
    title: 'Designer Handbag',
    size: 'One Size',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    points: 300
  },
  {
    _id: '5',
    title: 'Leather Boots',
    size: '9',
    condition: 'Very Good',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    points: 180
  },
  {
    _id: '6',
    title: 'Wool Sweater',
    size: 'M',
    condition: 'Excellent',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    points: 120
  }
];
export const mockItems = [
  {
    id: 1,
    title: "Vintage Floral Blouse",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
    points: 150,
    category: "Women's Tops",
    size: "Medium",
    condition: "Excellent",
    location: "San Francisco, CA",
    uploader: "Sarah Johnson",
    rating: 4.8,
    available: true,
    featured: true
  },
  {
    id: 2,
    title: "Designer Denim Jacket",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
    points: 300,
    category: "Women's Outerwear",
    size: "Small",
    condition: "Very Good",
    location: "Los Angeles, CA",
    uploader: "Emma Wilson",
    rating: 4.9,
    available: true,
    featured: true
  },
  {
    id: 3,
    title: "Cotton Summer Dress",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=400&fit=crop",
    points: 200,
    category: "Women's Dresses",
    size: "Large",
    condition: "Good",
    location: "New York, NY",
    uploader: "Madison Chen",
    rating: 4.7,
    available: false,
    featured: false
  },
  {
    id: 4,
    title: "Leather Ankle Boots",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    points: 250,
    category: "Women's Shoes",
    size: "8",
    condition: "Excellent",
    location: "Chicago, IL",
    uploader: "Alex Rivera",
    rating: 4.6,
    available: true,
    featured: true
  },
  {
    id: 5,
    title: "Wool Knit Sweater",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop",
    points: 180,
    category: "Women's Sweaters",
    size: "Medium",
    condition: "Very Good",
    location: "Seattle, WA",
    uploader: "Jordan Park",
    rating: 4.8,
    available: true,
    featured: false
  },
  {
    id: 6,
    title: "Silk Scarf Collection",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop",
    points: 120,
    category: "Accessories",
    size: "One Size",
    condition: "Excellent",
    location: "Miami, FL",
    uploader: "Taylor Swift",
    rating: 4.9,
    available: true,
    featured: false
  }
];

// Mock data - replace with your actual imports
export const userProfile = {
  name: "Sarah Johnson",
  email: "sarah.johnson@email.com",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
  points: 320,
  stats: {
    listings: 12,
    swaps: 23
  },
  location: "San Francisco, CA",
  memberSince: "2023",
  rating: 4.8
};

export const myListings = [
  {
    _id: "1",
    title: "Vintage Floral Blouse",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    points: 150,
    status: "Available"
  },
  {
    _id: "2",
    title: "Denim Jacket",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    points: 200,
    status: "Swapped"
  },
  {
    _id: "3",
    title: "Summer Dress",
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    points: 180,
    status: "Available"
  },
  {
    _id: "4",
    title: "Wool Sweater",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    points: 220,
    status: "Available"
  }
];

export const mySwaps = {
  ongoing: [
    {
      title: "Leather Boots",
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      swapPartner: "Emma Wilson",
      status: "Pending Response"
    },
    {
      title: "Silk Scarf",
      image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      swapPartner: "Lisa Chen",
      status: "In Progress"
    }
  ],
  completed: [
    {
      title: "Casual T-Shirt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      swapPartner: "Mike Brown",
      status: "Completed"
    },
    {
      title: "Maxi Skirt",
      image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      swapPartner: "Anna Davis",
      status: "Completed"
    }
  ]
};