"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAllPayments } from "@/lib/mock-data"
import type { PaymentStatus, PaymentType } from "@/lib/types"
import { Search } from "lucide-react"

export function AdminPaymentsContent() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [typeFilter, setTypeFilter] = useState<string>("all")
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

  const allPayments = getAllPayments()

  const filteredPayments = allPayments.filter((payment) => {
    const matchesType = typeFilter === "all" || payment.paymentType === typeFilter
    const matchesStatus = statusFilter === "all" || payment.paymentStatus === statusFilter
    const matchesSearch =
      payment.lot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.referenceNo.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesType && matchesStatus && matchesSearch
  })

  const totalRevenue = allPayments.filter((p) => p.paymentStatus === "SUCCESS").reduce((sum, p) => sum + p.amount, 0)

  const pendingPayments = allPayments.filter((p) => p.paymentStatus === "PENDING").reduce((sum, p) => sum + p.amount, 0)

  const getStatusBadgeVariant = (status: PaymentStatus) => {
    switch (status) {
      case "SUCCESS":
        return "default"
      case "PENDING":
        return "secondary"
      case "FAILED":
        return "destructive"
      case "FORFEITED":
        return "outline"
      default:
        return "outline"
    }
  }

  const getTypeBadgeVariant = (type: PaymentType) => {
    return type === "DEPOSIT" ? "outline" : "default"
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-6xl p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Payments</h1>
            <p className="text-muted-foreground">Track all payments and revenue</p>
          </div>

          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-success">${totalRevenue.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold text-accent">${pendingPayments.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{allPayments.length}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">Payment History</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 sm:w-48"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="DEPOSIT">Deposit</SelectItem>
                      <SelectItem value="FINAL">Final</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="SUCCESS">Success</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="FAILED">Failed</SelectItem>
                      <SelectItem value="FORFEITED">Forfeited</SelectItem>
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
                      <TableHead>Reference</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Lot</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-mono text-sm">{payment.referenceNo}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{payment.user.fullName}</p>
                            <p className="text-sm text-muted-foreground">{payment.user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate">{payment.lot.title}</TableCell>
                        <TableCell>
                          <Badge variant={getTypeBadgeVariant(payment.paymentType)}>{payment.paymentType}</Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium">${payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(payment.paymentStatus)}>{payment.paymentStatus}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {new Date(payment.createdAt).toLocaleDateString()}
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
