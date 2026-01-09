// Core data types for the Bidding Management System

export type UserRole = "ADMIN" | "BIDDER"

export type AuctionStatus = "DRAFT" | "LIVE" | "CLOSED"

export type LotStatus = "OPEN" | "CLOSED" | "SOLD" | "RE_AUCTION"

export type BidStatus = "ACTIVE" | "WINNING" | "LOST" | "REJECTED"

export type PaymentType = "DEPOSIT" | "FINAL"

export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "FORFEITED"

export type BidAction = "CREATE" | "UPDATE" | "DELETE" | "WIN" | "REJECT"

export interface User {
  id: number
  fullName: string
  phone: string
  email: string
  role: UserRole
  isActive: boolean
  createdAt: Date
}

export interface Auction {
  id: number
  name: string
  description?: string
  startDate: Date
  endDate: Date
  location: string
  status: AuctionStatus
  imageUrl?: string
  totalLots?: number
  createdAt: Date
}

export interface Lot {
  id: number
  auctionId: number
  title: string
  category: string
  description: string
  reservedPrice: number
  depositAmount: number
  status: LotStatus
  imageUrl?: string
  currentBid?: number
  totalBids?: number
  auction?: Auction
  createdAt: Date
}

export interface BidderRegistration {
  id: number
  userId: number
  auctionId: number
  registrationFee: number
  isVerified: boolean
  bidderNumber: string
  createdAt: Date
}

export interface Bid {
  id: number
  lotId: number
  userId: number
  bidAmount: number
  bidStatus: BidStatus
  lot?: Lot
  user?: User
  createdAt: Date
}

export interface BidTransaction {
  id: number
  bidId: number
  action: BidAction
  amountSnapshot: number
  performedBy: "USER" | "ADMIN"
  createdAt: Date
}

export interface Payment {
  id: number
  userId: number
  lotId: number
  bidId?: number
  amount: number
  paymentType: PaymentType
  paymentStatus: PaymentStatus
  referenceNo: string
  createdAt: Date
}

export interface LotEligibility {
  id: number
  userId: number
  lotId: number
  depositPaid: boolean
  eligibleToBid: boolean
}

// Auth types
export interface AuthUser extends User {
  token?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  fullName: string
  email: string
  phone: string
  password: string
}
