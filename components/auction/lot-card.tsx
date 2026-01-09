import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Lot } from "@/lib/types"

interface LotCardProps {
  lot: Lot
}

export function LotCard({ lot }: LotCardProps) {
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
    <Link href={`/lots/${lot.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={lot.imageUrl || "/placeholder.svg?height=400&width=400&query=auction lot item"}
            alt={lot.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge variant="outline" className={`absolute left-3 top-3 ${statusColors[lot.status]}`}>
            {lot.status === "OPEN" ? "Open for Bidding" : lot.status}
          </Badge>
        </div>
        <CardContent className="p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{lot.category}</p>
          <h3 className="mt-1 line-clamp-2 font-semibold leading-snug group-hover:text-accent">{lot.title}</h3>
          <div className="mt-3 flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">
                {lot.currentBid && lot.currentBid > 0 ? "Current Bid" : "Reserve Price"}
              </p>
              <p className="text-lg font-bold">
                {formatCurrency(lot.currentBid && lot.currentBid > 0 ? lot.currentBid : lot.reservedPrice)}
              </p>
            </div>
            {lot.totalBids !== undefined && lot.totalBids > 0 && (
              <p className="text-sm text-muted-foreground">{lot.totalBids} bids</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
