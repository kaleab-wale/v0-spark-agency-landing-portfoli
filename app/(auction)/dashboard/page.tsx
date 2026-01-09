"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getUserStats, getBidsByUser, getRegistrationsByUser } from "@/lib/mock-data"
import { Gavel, Trophy, CreditCard, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  const stats = getUserStats(user.id)
  const recentBids = getBidsByUser(user.id).slice(0, 3)
  const registrations = getRegistrationsByUser(user.id)

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Welcome back, {user.fullName}</h1>
            <p className="text-muted-foreground">Here's an overview of your bidding activity</p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard title="Total Bids" value={stats.totalBids} icon={Gavel} />
            <StatsCard title="Active Bids" value={stats.activeBids} icon={TrendingUp} />
            <StatsCard title="Won Bids" value={stats.wonBids} icon={Trophy} />
            <StatsCard title="Total Spent" value={`$${stats.totalSpent.toLocaleString()}`} icon={CreditCard} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Bids */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Bids</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/my-bids">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {recentBids.length > 0 ? (
                  <div className="space-y-4">
                    {recentBids.map((bid) => (
                      <div
                        key={bid.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{bid.lot.title}</p>
                          <p className="text-sm text-muted-foreground">${bid.bidAmount.toLocaleString()}</p>
                        </div>
                        <Badge
                          variant={
                            bid.bidStatus === "WINNING"
                              ? "default"
                              : bid.bidStatus === "ACTIVE"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {bid.bidStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-muted-foreground">No bids yet. Start bidding on lots!</p>
                )}
              </CardContent>
            </Card>

            {/* Registered Auctions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registered Auctions</CardTitle>
              </CardHeader>
              <CardContent>
                {registrations.length > 0 ? (
                  <div className="space-y-4">
                    {registrations.map((reg) => (
                      <div
                        key={reg.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{reg.auction.name}</p>
                          <p className="text-sm text-muted-foreground">Bidder #{reg.bidderNumber}</p>
                        </div>
                        <Badge variant={reg.isVerified ? "default" : "secondary"}>
                          {reg.isVerified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-8 text-center text-muted-foreground">No auction registrations yet.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
