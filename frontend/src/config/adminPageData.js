export const  ordersData =[
{
      id: 1,
      orderNumber: 'ORD-2025-001',
      buyer: 'Alice Cooper',
      seller: 'Sarah Johnson',
      item: 'Vintage Leather Jacket',
      itemImage: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop&crop=center',
      status: 'pending',
      exchangeType: 'swap',
      swapItem: 'Designer Handbag',
      points: 0,
      date: '2025-01-15',
      shippingAddress: '123 Main St, New York, NY 10001'
    },
    {
      id: 2,
      orderNumber: 'ORD-2025-002',
      buyer: 'David Kim',
      seller: 'Mike Chen',
      item: 'Designer Sneakers',
      itemImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop&crop=center',
      status: 'confirmed',
      exchangeType: 'points',
      swapItem: null,
      points: 150,
      date: '2025-01-14',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210'
    },
    {
      id: 3,
      orderNumber: 'ORD-2025-003',
      buyer: 'Lisa Wang',
      seller: 'Emma Wilson',
      item: 'Silk Scarf Collection',
      itemImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=80&h=80&fit=crop&crop=center',
      status: 'shipped',
      exchangeType: 'swap',
      swapItem: 'Vintage Boots',
      points: 0,
      date: '2025-01-13',
      shippingAddress: '789 Pine Rd, Chicago, IL 60601'
    },
    {
      id: 4,
      orderNumber: 'ORD-2025-004',
      buyer: 'Tom Wilson',
      seller: 'James Rodriguez',
      item: 'Denim Jacket',
      itemImage: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=80&h=80&fit=crop&crop=center',
      status: 'completed',
      exchangeType: 'points',
      swapItem: null,
      points: 120,
      date: '2025-01-12',
      shippingAddress: '321 Elm St, Boston, MA 02101'
    },
    {
      id: 5,
      orderNumber: 'ORD-2025-005',
      buyer: 'Rachel Green',
      seller: 'Sarah Johnson',
      item: 'Summer Dress',
      itemImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=80&h=80&fit=crop&crop=center',
      status: 'disputed',
      exchangeType: 'swap',
      swapItem: 'Casual Blazer',
      points: 0,
      date: '2025-01-11',
      shippingAddress: '654 Maple Dr, Seattle, WA 98101'
    }
]
export const listData = [
    {
      id: 1,
      user: 'Sarah Johnson',
      userAvatar: '/api/placeholder/40/40',
      item: 'Vintage Leather Jacket',
      category: 'Outerwear',
      condition: 'Good',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=80&h=80&fit=crop&crop=center',
      description: 'Beautiful vintage leather jacket in excellent condition. Minimal wear, perfect for fall season.',
      reportCount: 0,
      dateSubmitted: '2025-01-15'
    },
    {
      id: 2,
      user: 'Mike Chen',
      userAvatar: '/api/placeholder/40/40',
      item: 'Designer Sneakers',
      category: 'Footwear',
      condition: 'Like New',
      status: 'approved',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=80&h=80&fit=crop&crop=center',
      description: 'Limited edition designer sneakers, worn only twice. Original box included.',
      reportCount: 0,
      dateSubmitted: '2025-01-14'
    },
    {
      id: 3,
      user: 'Emma Wilson',
      userAvatar: '/api/placeholder/40/40',
      item: 'Silk Scarf Collection',
      category: 'Accessories',
      condition: 'Excellent',
      status: 'flagged',
      image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=80&h=80&fit=crop&crop=center',
      description: 'Set of 3 silk scarves from luxury brands. Perfect condition, never worn.',
      reportCount: 2,
      dateSubmitted: '2025-01-13'
    },
    {
      id: 4,
      user: 'James Rodriguez',
      userAvatar: '/api/placeholder/40/40',
      item: 'Denim Jacket',
      category: 'Outerwear',
      condition: 'Fair',
      status: 'pending',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=80&h=80&fit=crop&crop=center',
      description: 'Classic denim jacket with some wear marks. Still has lots of life left.',
      reportCount: 0,
      dateSubmitted: '2025-01-12'
    }
  ] 
export const usersData=[
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: '/api/placeholder/40/40',
      joinDate: '2024-11-15',
      itemsListed: 12,
      itemsExchanged: 8,
      status: 'active',
      reputation: 4.8
    },
    {
      id: 2,
      name: 'Mike Chen',
      email: 'mike@example.com',
      avatar: '/api/placeholder/40/40',
      joinDate: '2024-12-01',
      itemsListed: 6,
      itemsExchanged: 4,
      status: 'active',
      reputation: 4.9
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      avatar: '/api/placeholder/40/40',
      joinDate: '2024-10-20',
      itemsListed: 15,
      itemsExchanged: 10,
      status: 'flagged',
      reputation: 3.2
    }
  ]

    
