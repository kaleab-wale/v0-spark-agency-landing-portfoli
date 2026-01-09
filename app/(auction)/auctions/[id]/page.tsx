import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LotCard } from "@/components/auction/lot-card"
import { CountdownTimer } from "@/components/auction/countdown-timer"
import { getAuctionById, getLotsByAuction } from "@/lib/mock-data"
import { MapPin, Calendar, Package, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const auction = getAuctionById(Number(id))
  return {
    title: auction ? `${auction.name} | BidVault` : "Auction Not Found",
    description: auction?.description || "View auction details and browse available lots.",
  }
}

export default async function AuctionDetailPage({ params }: PageProps) {
  const { id } = await params
  const auction = getAuctionById(Number(id))

  if (!auction) {
    notFound()
  }

  const lots = getLotsByAuction(auction.id)

  const statusColors = {
    LIVE: "bg-success text-success-foreground",
    DRAFT: "bg-secondary text-secondary-foreground",
    CLOSED: "bg-muted text-muted-foreground",
  }

  const statusLabels = {
    LIVE: "Live Now",
    DRAFT: "Upcoming",
    CLOSED: "Closed",
  }

  return (
    <div className="min-h-screen pb-16">
      {/* Back Link */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/auctions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Auctions
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 h-[400px] overflow-hidden">
          <Image
            src={auction.imageUrl || "/placeholder.svg?height=400&width=1200&query=auction"}
            alt={auction.name}
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Auction Info */}
            <div className="lg:col-span-2">
              <Badge className={statusColors[auction.status]}>{statusLabels[auction.status]}</Badge>
              <h1 className="mt-4 font-serif text-3xl font-normal sm:text-4xl">{auction.name}</h1>
              {auction.description && <p className="mt-4 text-lg text-muted-foreground">{auction.description}</p>}
              <div className="mt-6 flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{auction.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {new Date(auction.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    {" - "}
                    {new Date(auction.endDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  <span>{lots.length} lots</span>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  {auction.status === "LIVE" && <CountdownTimer targetDate={auction.endDate} />}
                  {auction.status === "DRAFT" && <CountdownTimer targetDate={auction.startDate} label="Starts in" />}
                  {auction.status === "CLOSED" && (
                    <p className="text-center text-muted-foreground">This auction has ended</p>
                  )}
                  <div className="mt-6">
                    {auction.status !== "CLOSED" ? (
                      <Button className="w-full" size="lg" asChild>
                        <Link href="/register">Register to Bid</Link>
                      </Button>
                    ) : (
                      <Button className="w-full bg-transparent" size="lg" variant="outline" disabled>
                        Auction Closed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Lots Grid */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold">Available Lots</h2>
        <p className="mt-1 text-muted-foreground">Browse all {lots.length} lots in this auction</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {lots.map((lot) => (
            <LotCard key={lot.id} lot={lot} />
          ))}
        </div>
        {lots.length === 0 && (
          <Card className="mt-8">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">No lots available yet</p>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  )
}
