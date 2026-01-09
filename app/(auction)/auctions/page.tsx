import { Suspense } from "react"
import { AuctionCard } from "@/components/auction/auction-card"
import { AuctionCarousel } from "@/components/auction/auction-carousel"
import { mockAuctions } from "@/lib/mock-data"
import { Shield, Gavel, Globe, Users, Clock, Award } from "lucide-react"
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
  const carouselAuctions = [...liveAuctions, ...upcomingAuctions]

  return (
    <div className="min-h-screen">
      <section className="relative">
        <Suspense fallback={<div className="h-[600px] animate-pulse bg-muted" />}>
          <AuctionCarousel auctions={carouselAuctions} />
        </Suspense>
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

      <section className="bg-secondary/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Why Choose BidVault?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
              The premier destination for collectors and connoisseurs seeking exceptional items
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Secure Bidding</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bank-level encryption and secure payment processing protect every transaction
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Gavel className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Authenticated Items</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Every lot is verified by industry experts ensuring authenticity and provenance
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Global Reach</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Access auctions worldwide from the comfort of your home with real-time bidding
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Expert Support</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Dedicated specialists available to assist with inquiries and bidding strategies
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Transparent Process</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Clear bidding increments, fees, and real-time updates keep you informed
              </p>
            </div>
            <div className="flex flex-col items-center rounded-lg bg-background p-6 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Premium Quality</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Curated collections featuring only the finest art, antiques, and collectibles
              </p>
            </div>
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

      <section className="border-t border-border bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">How It Works</h2>
            <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">Start bidding in three simple steps</p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-4 font-semibold">Create an Account</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sign up for free and complete your profile to start exploring auctions
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-4 font-semibold">Register for Auctions</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Browse available auctions and register for the ones that interest you
              </p>
            </div>
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-4 font-semibold">Place Your Bids</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Bid on lots in real-time and track your winning items from your dashboard
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
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
