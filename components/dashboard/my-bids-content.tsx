"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getBidsByUser } from "@/lib/mock-data"
import type { BidStatus } from "@/lib/types"
import { Search, ExternalLink } from "lucide-react"
import Link from "next/link"

export function MyBidsContent() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  const allBids = getBidsByUser(user.id)

  const filteredBids = allBids.filter((bid) => {
    const matchesStatus = statusFilter === "all" || bid.bidStatus === statusFilter
    const matchesSearch = bid.lot.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const getStatusBadgeVariant = (status: BidStatus) => {
    switch (status) {
      case "WINNING":
        return "default"
      case "ACTIVE":
        return "secondary"
      case "LOST":
        return "outline"
      case "REJECTED":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">My Bids</h1>
            <p className="text-muted-foreground">Track and manage all your bids</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">Bid History</CardTitle>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search lots..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 sm:w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="WINNING">Winning</SelectItem>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="LOST">Lost</SelectItem>
                      <SelectItem value="REJECTED">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredBids.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lot</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead className="text-right">Your Bid</TableHead>
                        <TableHead className="text-right">Current Bid</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBids.map((bid) => (
                        <TableRow key={bid.id}>
                          <TableCell className="max-w-[200px] truncate font-medium">{bid.lot.title}</TableCell>
                          <TableCell className="text-muted-foreground">{bid.lot.category}</TableCell>
                          <TableCell className="text-right">${bid.bidAmount.toLocaleString()}</TableCell>
                          <TableCell className="text-right">${(bid.lot.currentBid || 0).toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(bid.bidStatus)}>{bid.bidStatus}</Badge>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {new Date(bid.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/lots/${bid.lotId}`}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">
                    {searchQuery || statusFilter !== "all"
                      ? "No bids match your filters"
                      : "You haven't placed any bids yet"}
                  </p>
                  <Button className="mt-4" asChild>
                    <Link href="/auctions">Browse Auctions</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
