"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getAdminStats, mockAuctions, getAllBids } from "@/lib/mock-data"
import { Gavel, Package, DollarSign, TrendingUp, ArrowRight, Plus } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "ADMIN") {
      router.push("/dashboard")
    }
  }, [isAuthenticated, user, router])

  if (!user || user.role !== "ADMIN") {
    return null
  }

  const stats = getAdminStats()
  const recentBids = getAllBids().slice(0, 5)

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6 lg:p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your auctions and monitor bidding activity</p>
            </div>
            <Button asChild>
              <Link href="/admin/auctions">
                <Plus className="mr-2 h-4 w-4" />
                New Auction
              </Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Auctions"
              value={stats.totalAuctions}
              icon={Gavel}
              description={`${stats.liveAuctions} live`}
            />
            <StatsCard
              title="Total Lots"
              value={stats.totalLots}
              icon={Package}
              description={`${stats.openLots} open`}
            />
            <StatsCard title="Total Bids" value={stats.totalBids} icon={TrendingUp} />
            <StatsCard title="Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} icon={DollarSign} />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recent Auctions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Auctions</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/auctions">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAuctions.slice(0, 4).map((auction) => (
                    <div
                      key={auction.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{auction.name}</p>
                        <p className="text-sm text-muted-foreground">{auction.totalLots} lots</p>
                      </div>
                      <Badge
                        variant={
                          auction.status === "LIVE" ? "default" : auction.status === "DRAFT" ? "secondary" : "outline"
                        }
                      >
                        {auction.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Bids */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Recent Bids</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/admin/bids">
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
                          <p className="text-sm text-muted-foreground">
                            {bid.user.fullName} - ${bid.bidAmount.toLocaleString()}
                          </p>
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
                  <p className="py-8 text-center text-muted-foreground">No bids yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
