import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Package } from "lucide-react"
import type { Auction } from "@/lib/types"

interface AuctionCardProps {
  auction: Auction
}

export function AuctionCard({ auction }: AuctionCardProps) {
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
    <Link href={`/auctions/${auction.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={auction.imageUrl || "/placeholder.svg?height=300&width=400&query=auction"}
            alt={auction.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className={`absolute left-3 top-3 ${statusColors[auction.status]}`}>
            {statusLabels[auction.status]}
          </Badge>
        </div>
        <CardContent className="p-5">
          <h3 className="line-clamp-1 text-lg font-semibold group-hover:text-accent">{auction.name}</h3>
          {auction.description && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{auction.description}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              <span>{auction.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>
                {new Date(auction.startDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
            {auction.totalLots && (
              <div className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                <span>{auction.totalLots} lots</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
