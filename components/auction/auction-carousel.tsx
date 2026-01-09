"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight, MapPin, Calendar } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CountdownTimer } from "@/components/auction/countdown-timer"
import type { Auction } from "@/lib/types"

interface AuctionCarouselProps {
  auctions: Auction[]
}

export function AuctionCarousel({ auctions }: AuctionCarouselProps) {
  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }))

  return (
    <Carousel plugins={[plugin.current]} className="w-full" opts={{ loop: true }}>
      <CarouselContent className="ml-0">
        {auctions.map((auction) => (
          <CarouselItem key={auction.id} className="pl-0">
            <div className="relative h-[500px] w-full overflow-hidden sm:h-[550px] lg:h-[600px]">
              {/* Background Image */}
              <Image
                src={auction.imageUrl || "/placeholder.svg?height=600&width=1200&query=auction"}
                alt={auction.name}
                fill
                className="object-cover"
                priority
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

              {/* Content */}
              <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-12 lg:px-20">
                <div className="max-w-2xl">
                  <Badge variant={auction.status === "LIVE" ? "destructive" : "secondary"} className="mb-4">
                    {auction.status === "LIVE" && (
                      <span className="mr-1.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-white opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                      </span>
                    )}
                    {auction.status === "LIVE" ? "Live Now" : auction.status === "DRAFT" ? "Coming Soon" : "Closed"}
                  </Badge>

                  <h2 className="font-serif text-3xl font-normal tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {auction.name}
                  </h2>

                  <p className="mt-4 max-w-lg text-base text-white/80 sm:text-lg">{auction.description}</p>

                  <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/70">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {auction.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {auction.totalLots} Lots
                    </div>
                  </div>

                  {auction.status === "LIVE" && (
                    <div className="mt-6">
                      <CountdownTimer targetDate={auction.endDate} label="Ends in:" variant="light" />
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Button size="lg" asChild>
                      <Link href={`/auctions/${auction.id}`}>
                        {auction.status === "LIVE" ? "Bid Now" : "View Auction"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                      asChild
                    >
                      <Link href="/register">Register to Bid</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 border-white/30 bg-white/10 text-white hover:bg-white/20 sm:left-8" />
      <CarouselNext className="right-4 border-white/30 bg-white/10 text-white hover:bg-white/20 sm:right-8" />
    </Carousel>
  )
}
