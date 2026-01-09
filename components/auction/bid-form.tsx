"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"
import type { Lot } from "@/lib/types"
import Link from "next/link"

interface BidFormProps {
  lot: Lot
}

export function BidForm({ lot }: BidFormProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const minimumBid = lot.currentBid && lot.currentBid > 0 ? lot.currentBid + 1000 : lot.reservedPrice

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const amount = Number(bidAmount.replace(/[^0-9]/g, ""))

    if (amount < minimumBid) {
      setError(`Minimum bid is ${formatCurrency(minimumBid)}`)
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In real app, this would submit to API
    alert(`Bid of ${formatCurrency(amount)} placed successfully!`)
    setBidAmount("")
    setIsSubmitting(false)
  }

  if (!isAuthenticated) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="mb-4 text-center text-muted-foreground">Sign in to place a bid on this lot</p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <Label htmlFor="bid-amount">Your Bid</Label>
          <div className="relative mt-1.5">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="bid-amount"
              type="text"
              placeholder={minimumBid.toLocaleString()}
              value={bidAmount}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, "")
                setBidAmount(value ? Number(value).toLocaleString() : "")
              }}
              className="pl-7"
            />
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">Minimum bid: {formatCurrency(minimumBid)}</p>
          {error && <p className="mt-1.5 text-sm text-destructive">{error}</p>}
        </div>
        <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
          {isSubmitting ? "Placing Bid..." : "Place Bid"}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          By placing a bid, you agree to pay the deposit if you win
        </p>
      </div>
    </form>
  )
}
