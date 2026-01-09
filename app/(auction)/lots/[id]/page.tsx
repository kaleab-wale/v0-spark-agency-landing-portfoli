import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CountdownTimer } from "@/components/auction/countdown-timer"
import { getLotById, getAuctionById } from "@/lib/mock-data"
import { ArrowLeft, Shield, Clock, Users } from "lucide-react"
import type { Metadata } from "next"
import { BidForm } from "@/components/auction/bid-form"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const lot = getLotById(Number(id))
  return {
    title: lot ? `${lot.title} | BidVault` : "Lot Not Found",
    description: lot?.description || "View lot details and place your bid.",
  }
}

export default async function LotDetailPage({ params }: PageProps) {
  const { id } = await params
  const lot = getLotById(Number(id))

  if (!lot) {
    notFound()
  }

  const auction = getAuctionById(lot.auctionId)

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const statusColors = {
    OPEN: "bg-success/10 text-success border-success/20",
    CLOSED: "bg-muted text-muted-foreground",
    SOLD: "bg-accent/10 text-accent border-accent/20",
    RE_AUCTION: "bg-chart-5/10 text-chart-5 border-chart-5/20",
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Back Link */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={auction ? `/auctions/${auction.id}` : "/auctions"}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {auction?.name || "Auctions"}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Image Section */}
          <div className="lg:col-span-3">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary">
              <Image
                src={lot.imageUrl || "/placeholder.svg?height=600&width=600&query=auction lot item"}
                alt={lot.title}
                fill
                className="object-cover"
                priority
              />
              <Badge variant="outline" className={`absolute left-4 top-4 ${statusColors[lot.status]}`}>
                {lot.status === "OPEN" ? "Open for Bidding" : lot.status}
              </Badge>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">{lot.category}</p>
              <h1 className="mt-2 font-serif text-2xl font-normal sm:text-3xl">{lot.title}</h1>

              {auction && (
                <Link
                  href={`/auctions/${auction.id}`}
                  className="mt-2 inline-block text-sm text-muted-foreground hover:text-foreground hover:underline"
                >
                  Part of: {auction.name}
                </Link>
              )}

              <Separator className="my-6" />

              {/* Pricing Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Reserve Price</span>
                  <span className="font-medium">{formatCurrency(lot.reservedPrice)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Required Deposit</span>
                  <span className="font-medium">{formatCurrency(lot.depositAmount)}</span>
                </div>
                {lot.currentBid && lot.currentBid > 0 && (
                  <div className="flex items-center justify-between rounded-lg bg-accent/10 px-4 py-3">
                    <span className="font-medium">Current Bid</span>
                    <span className="text-xl font-bold">{formatCurrency(lot.currentBid)}</span>
                  </div>
                )}
                {lot.totalBids !== undefined && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total Bids</span>
                    <span>{lot.totalBids} bids</span>
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              {/* Bid Form */}
              {lot.status === "OPEN" && auction?.status === "LIVE" && <BidForm lot={lot} />}

              {lot.status !== "OPEN" && (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-8">
                    <p className="text-muted-foreground">This lot is no longer accepting bids</p>
                  </CardContent>
                </Card>
              )}

              {auction?.status === "LIVE" && lot.status === "OPEN" && (
                <>
                  <Separator className="my-6" />
                  <CountdownTimer targetDate={auction.endDate} />
                </>
              )}

              {/* Trust Badges */}
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Secure Bidding</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Real-time Updates</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Verified Bidders</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-relaxed text-muted-foreground">{lot.description}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
