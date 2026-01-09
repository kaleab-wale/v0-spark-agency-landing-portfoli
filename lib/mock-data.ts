import type { Auction, Lot, User, Bid, BidderRegistration, Payment } from "./types"

// Mock users
export const mockUsers: User[] = [
  {
    id: 1,
    fullName: "Admin User",
    phone: "+1234567890",
    email: "admin@bidding.com",
    role: "ADMIN",
    isActive: true,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: 2,
    fullName: "John Doe",
    phone: "+1987654321",
    email: "john@example.com",
    role: "BIDDER",
    isActive: true,
    createdAt: new Date("2024-02-15"),
  },
]

// Mock auctions
export const mockAuctions: Auction[] = [
  {
    id: 1,
    name: "Spring Fine Art Collection",
    description: "Featuring exceptional works from contemporary and classical artists",
    startDate: new Date("2025-02-01"),
    endDate: new Date("2025-02-15"),
    location: "New York, NY",
    status: "LIVE",
    imageUrl: "/fine-art-auction-gallery.jpg",
    totalLots: 45,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: 2,
    name: "Luxury Watch Auction",
    description: "Rare timepieces from Rolex, Patek Philippe, and Audemars Piguet",
    startDate: new Date("2025-02-10"),
    endDate: new Date("2025-02-20"),
    location: "Geneva, Switzerland",
    status: "LIVE",
    imageUrl: "/luxury-watches.png",
    totalLots: 32,
    createdAt: new Date("2024-12-15"),
  },
  {
    id: 3,
    name: "Classic Automobile Showcase",
    description: "Vintage and classic cars from prestigious collections",
    startDate: new Date("2025-03-01"),
    endDate: new Date("2025-03-10"),
    location: "Monterey, CA",
    status: "DRAFT",
    imageUrl: "/classic-vintage-cars.jpg",
    totalLots: 28,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: 4,
    name: "Estate Jewelry Collection",
    description: "Exquisite diamonds, emeralds, and rare gemstones",
    startDate: new Date("2025-01-15"),
    endDate: new Date("2025-01-25"),
    location: "London, UK",
    status: "CLOSED",
    imageUrl: "/luxury-jewelry-diamonds.jpg",
    totalLots: 56,
    createdAt: new Date("2024-11-01"),
  },
]

// Mock lots
export const mockLots: Lot[] = [
  {
    id: 1,
    auctionId: 1,
    title: "Abstract Composition by Modern Master",
    category: "Paintings",
    description: "Oil on canvas, signed and dated 1965. Provenance includes major museum exhibitions.",
    reservedPrice: 50000,
    depositAmount: 5000,
    status: "OPEN",
    imageUrl: "/abstract-oil-painting-modern-art.jpg",
    currentBid: 62000,
    totalBids: 8,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: 2,
    auctionId: 1,
    title: "Bronze Sculpture - The Thinker Study",
    category: "Sculptures",
    description: "Bronze cast, numbered edition 3/12. Excellent patina and condition.",
    reservedPrice: 25000,
    depositAmount: 2500,
    status: "OPEN",
    imageUrl: "/bronze-sculpture-classical.jpg",
    currentBid: 31000,
    totalBids: 5,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: 3,
    auctionId: 2,
    title: "Rolex Daytona Ref. 6239 - Paul Newman",
    category: "Watches",
    description: "Rare Paul Newman dial, complete with box and papers. Service history available.",
    reservedPrice: 150000,
    depositAmount: 15000,
    status: "OPEN",
    imageUrl: "/rolex-daytona-vintage-watch.jpg",
    currentBid: 185000,
    totalBids: 12,
    createdAt: new Date("2024-12-15"),
  },
  {
    id: 4,
    auctionId: 2,
    title: "Patek Philippe Perpetual Calendar",
    category: "Watches",
    description: "Reference 3970, yellow gold case. Museum quality condition.",
    reservedPrice: 200000,
    depositAmount: 20000,
    status: "OPEN",
    imageUrl: "/patek-philippe-gold-watch.jpg",
    currentBid: 245000,
    totalBids: 9,
    createdAt: new Date("2024-12-15"),
  },
  {
    id: 5,
    auctionId: 1,
    title: "19th Century Impressionist Landscape",
    category: "Paintings",
    description: "Signed lower right, authenticated by leading experts. Beautiful gilt frame.",
    reservedPrice: 75000,
    depositAmount: 7500,
    status: "OPEN",
    imageUrl: "/impressionist-landscape.png",
    currentBid: 82000,
    totalBids: 6,
    createdAt: new Date("2024-12-01"),
  },
  {
    id: 6,
    auctionId: 3,
    title: "1961 Ferrari 250 GT SWB",
    category: "Automobiles",
    description: "Matching numbers, fully restored. Concours winning example.",
    reservedPrice: 5000000,
    depositAmount: 500000,
    status: "OPEN",
    imageUrl: "/ferrari-250-gt-classic-red.jpg",
    currentBid: 0,
    totalBids: 0,
    createdAt: new Date("2025-01-01"),
  },
]

// Mock bids
export const mockBids: Bid[] = [
  {
    id: 1,
    lotId: 1,
    userId: 2,
    bidAmount: 62000,
    bidStatus: "WINNING",
    createdAt: new Date("2025-02-05"),
  },
  {
    id: 2,
    lotId: 3,
    userId: 2,
    bidAmount: 175000,
    bidStatus: "ACTIVE",
    createdAt: new Date("2025-02-12"),
  },
]

// Mock registrations
export const mockRegistrations: BidderRegistration[] = [
  {
    id: 1,
    userId: 2,
    auctionId: 1,
    registrationFee: 500,
    isVerified: true,
    bidderNumber: "BID-001",
    createdAt: new Date("2025-01-28"),
  },
  {
    id: 2,
    userId: 2,
    auctionId: 2,
    registrationFee: 1000,
    isVerified: true,
    bidderNumber: "BID-002",
    createdAt: new Date("2025-02-08"),
  },
]

// Mock payments
export const mockPayments: Payment[] = [
  {
    id: 1,
    userId: 2,
    lotId: 1,
    amount: 5000,
    paymentType: "DEPOSIT",
    paymentStatus: "SUCCESS",
    referenceNo: "PAY-2025-001",
    createdAt: new Date("2025-02-01"),
  },
  {
    id: 2,
    userId: 2,
    lotId: 3,
    amount: 15000,
    paymentType: "DEPOSIT",
    paymentStatus: "SUCCESS",
    referenceNo: "PAY-2025-002",
    createdAt: new Date("2025-02-10"),
  },
  {
    id: 3,
    userId: 2,
    lotId: 1,
    bidId: 1,
    amount: 62000,
    paymentType: "FINAL",
    paymentStatus: "PENDING",
    referenceNo: "PAY-2025-003",
    createdAt: new Date("2025-02-06"),
  },
]

// Helper functions
export function getAuctionById(id: number): Auction | undefined {
  return mockAuctions.find((a) => a.id === id)
}

export function getLotById(id: number): Lot | undefined {
  return mockLots.find((l) => l.id === id)
}

export function getLotsByAuction(auctionId: number): Lot[] {
  return mockLots.filter((l) => l.auctionId === auctionId)
}

export function getLiveAuctions(): Auction[] {
  return mockAuctions.filter((a) => a.status === "LIVE")
}

export function getUpcomingAuctions(): Auction[] {
  return mockAuctions.filter((a) => a.status === "DRAFT")
}

export function getFeaturedLots(): Lot[] {
  return mockLots.filter((l) => l.status === "OPEN").slice(0, 6)
}

// User helpers
export function getBidsByUser(userId: number): (Bid & { lot: Lot })[] {
  return mockBids
    .filter((b) => b.userId === userId)
    .map((bid) => ({
      ...bid,
      lot: mockLots.find((l) => l.id === bid.lotId)!,
    }))
}

export function getPaymentsByUser(userId: number): (Payment & { lot: Lot })[] {
  return mockPayments
    .filter((p) => p.userId === userId)
    .map((payment) => ({
      ...payment,
      lot: mockLots.find((l) => l.id === payment.lotId)!,
    }))
}

export function getRegistrationsByUser(userId: number): (BidderRegistration & { auction: Auction })[] {
  return mockRegistrations
    .filter((r) => r.userId === userId)
    .map((reg) => ({
      ...reg,
      auction: mockAuctions.find((a) => a.id === reg.auctionId)!,
    }))
}

export function getUserStats(userId: number) {
  const userBids = mockBids.filter((b) => b.userId === userId)
  const userPayments = mockPayments.filter((p) => p.userId === userId)
  const winningBids = userBids.filter((b) => b.bidStatus === "WINNING")

  return {
    totalBids: userBids.length,
    activeBids: userBids.filter((b) => b.bidStatus === "ACTIVE" || b.bidStatus === "WINNING").length,
    wonBids: winningBids.length,
    totalSpent: userPayments.filter((p) => p.paymentStatus === "SUCCESS").reduce((sum, p) => sum + p.amount, 0),
  }
}

// Admin helpers
export function getAllBids(): (Bid & { lot: Lot; user: User })[] {
  return mockBids.map((bid) => ({
    ...bid,
    lot: mockLots.find((l) => l.id === bid.lotId)!,
    user: mockUsers.find((u) => u.id === bid.userId)!,
  }))
}

export function getAllPayments(): (Payment & { lot: Lot; user: User })[] {
  return mockPayments.map((payment) => ({
    ...payment,
    lot: mockLots.find((l) => l.id === payment.lotId)!,
    user: mockUsers.find((u) => u.id === payment.userId)!,
  }))
}

export function getAdminStats() {
  return {
    totalAuctions: mockAuctions.length,
    liveAuctions: mockAuctions.filter((a) => a.status === "LIVE").length,
    totalLots: mockLots.length,
    openLots: mockLots.filter((l) => l.status === "OPEN").length,
    totalBids: mockBids.length,
    totalRevenue: mockPayments.filter((p) => p.paymentStatus === "SUCCESS").reduce((sum, p) => sum + p.amount, 0),
  }
}
