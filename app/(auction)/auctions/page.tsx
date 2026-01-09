import { Suspense } from "react"
import { AuctionCard } from "@/components/auction/auction-card"
import { Badge } from "@/components/ui/badge"
import { mockAuctions, getFeaturedLots } from "@/lib/mock-data"
import { LotCard } from "@/components/auction/lot-card"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Auctions | BidVault",
  description: "Browse live and upcoming auctions featuring fine art, luxury watches, classic automobiles, and more.",
}

export default function AuctionsPage() {
  const liveAuctions = mockAuctions.filter((a) => a.status === "LIVE")
  const upcomingAuctions = mockAuctions.filter((a) => a.status === "DRAFT")
  const featuredLots = getFeaturedLots()

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="mr-1 h-3 w-3" />
              Premium Auctions
            </Badge>
            <h1 className="font-serif text-4xl font-normal tracking-tight sm:text-5xl lg:text-6xl">
              Discover Extraordinary
              <br />
              <span className="italic">Collections</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Browse curated auctions featuring fine art, luxury timepieces, classic automobiles, and rare collectibles
              from around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
                </span>
                <h2 className="text-2xl font-semibold">Live Auctions</h2>
              </div>
              <p className="mt-1 text-muted-foreground">Bid now on these active auctions</p>
            </div>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {liveAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lots */}
      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Featured Lots</h2>
              <p className="mt-1 text-muted-foreground">Exceptional items currently open for bidding</p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/lots">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense fallback={<div>Loading...</div>}>
              {featuredLots.map((lot) => (
                <LotCard key={lot.id} lot={lot} />
              ))}
            </Suspense>
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <Link href="/lots">
                View All Lots
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Auctions */}
      {upcomingAuctions.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-2xl font-semibold">Upcoming Auctions</h2>
              <p className="mt-1 text-muted-foreground">Register early to participate</p>
            </div>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingAuctions.map((auction) => (
                <AuctionCard key={auction.id} auction={auction} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Ready to Start Bidding?</h2>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Create an account to register for auctions, place bids, and track your favorite lots.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/register">Create Account</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
