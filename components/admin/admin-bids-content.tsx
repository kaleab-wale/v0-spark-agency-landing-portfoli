"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getAllBids } from "@/lib/mock-data"
import type { BidStatus } from "@/lib/types"
import { Search, Trophy, XCircle } from "lucide-react"

export function AdminBidsContent() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

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

  const allBids = getAllBids()

  const filteredBids = allBids.filter((bid) => {
    const matchesStatus = statusFilter === "all" || bid.bidStatus === statusFilter
    const matchesSearch =
      bid.lot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bid.user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
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
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Bids</h1>
            <p className="text-muted-foreground">View and manage all bids across auctions</p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">All Bids</CardTitle>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
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
                        <TableHead>Bidder</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBids.map((bid) => (
                        <TableRow key={bid.id}>
                          <TableCell className="max-w-[200px] truncate font-medium">{bid.lot.title}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{bid.user.fullName}</p>
                              <p className="text-sm text-muted-foreground">{bid.user.email}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-medium">${bid.bidAmount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(bid.bidStatus)}>{bid.bidStatus}</Badge>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {new Date(bid.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              {bid.bidStatus === "ACTIVE" && (
                                <>
                                  <Button variant="ghost" size="icon" title="Select as Winner">
                                    <Trophy className="h-4 w-4" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="ghost" size="icon" title="Reject Bid">
                                        <XCircle className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Reject this bid?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          This action cannot be undone. The bidder will be notified that their bid has
                                          been rejected.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                          Reject Bid
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No bids found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
