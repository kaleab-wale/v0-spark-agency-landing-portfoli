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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { mockLots, mockAuctions } from "@/lib/mock-data"
import type { LotStatus } from "@/lib/types"
import { Search, Plus, Pencil, Eye, XCircle } from "lucide-react"
import Link from "next/link"

export function AdminLotsContent() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [auctionFilter, setAuctionFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateOpen, setIsCreateOpen] = useState(false)

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

  const lotsWithAuction = mockLots.map((lot) => ({
    ...lot,
    auction: mockAuctions.find((a) => a.id === lot.auctionId),
  }))

  const filteredLots = lotsWithAuction.filter((lot) => {
    const matchesStatus = statusFilter === "all" || lot.status === statusFilter
    const matchesAuction = auctionFilter === "all" || lot.auctionId === Number(auctionFilter)
    const matchesSearch = lot.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesAuction && matchesSearch
  })

  const getStatusBadgeVariant = (status: LotStatus) => {
    switch (status) {
      case "OPEN":
        return "default"
      case "SOLD":
        return "secondary"
      case "CLOSED":
        return "outline"
      case "RE_AUCTION":
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
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Lots</h1>
              <p className="text-muted-foreground">Manage auction lots and inventory</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Lot
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Lot</DialogTitle>
                  <DialogDescription>Fill in the details to add a new lot.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="auction">Auction</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select auction" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockAuctions.map((auction) => (
                          <SelectItem key={auction.id} value={String(auction.id)}>
                            {auction.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Abstract Composition by Modern Master" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Input id="category" placeholder="Paintings" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="reservedPrice">Reserved Price</Label>
                      <Input id="reservedPrice" type="number" placeholder="50000" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deposit">Deposit Amount</Label>
                    <Input id="deposit" type="number" placeholder="5000" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Describe the lot..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateOpen(false)}>Create Lot</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">All Lots</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search lots..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 sm:w-48"
                    />
                  </div>
                  <Select value={auctionFilter} onValueChange={setAuctionFilter}>
                    <SelectTrigger className="w-full sm:w-44">
                      <SelectValue placeholder="Auction" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Auctions</SelectItem>
                      {mockAuctions.map((auction) => (
                        <SelectItem key={auction.id} value={String(auction.id)}>
                          {auction.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="OPEN">Open</SelectItem>
                      <SelectItem value="CLOSED">Closed</SelectItem>
                      <SelectItem value="SOLD">Sold</SelectItem>
                      <SelectItem value="RE_AUCTION">Re-Auction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Auction</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Reserve</TableHead>
                      <TableHead className="text-right">Current Bid</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLots.map((lot) => (
                      <TableRow key={lot.id}>
                        <TableCell className="max-w-[180px] truncate font-medium">{lot.title}</TableCell>
                        <TableCell className="max-w-[120px] truncate text-muted-foreground">
                          {lot.auction?.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{lot.category}</TableCell>
                        <TableCell className="text-right">${lot.reservedPrice.toLocaleString()}</TableCell>
                        <TableCell className="text-right">${(lot.currentBid || 0).toLocaleString()}</TableCell>
                        <TableCell>{lot.totalBids || 0}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(lot.status)}>{lot.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-1">
                            <Button variant="ghost" size="icon" asChild>
                              <Link href={`/lots/${lot.id}`}>
                                <Eye className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
