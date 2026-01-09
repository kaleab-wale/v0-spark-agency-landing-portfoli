"use client"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getPaymentsByUser } from "@/lib/mock-data"
import type { PaymentStatus, PaymentType } from "@/lib/types"
import { Download } from "lucide-react"

export default function PaymentsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!user) {
    return null
  }

  const allPayments = getPaymentsByUser(user.id)

  const filteredPayments = allPayments.filter((payment) => {
    const matchesType = typeFilter === "all" || payment.paymentType === typeFilter
    const matchesStatus = statusFilter === "all" || payment.paymentStatus === statusFilter
    return matchesType && matchesStatus
  })

  const totalPaid = allPayments.filter((p) => p.paymentStatus === "SUCCESS").reduce((sum, p) => sum + p.amount, 0)

  const pendingAmount = allPayments.filter((p) => p.paymentStatus === "PENDING").reduce((sum, p) => sum + p.amount, 0)

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
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-5xl p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Payments</h1>
            <p className="text-muted-foreground">View and manage your payment history</p>
          </div>

          {/* Summary Cards */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Total Paid</p>
                <p className="text-2xl font-bold text-success">${totalPaid.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
                <p className="text-2xl font-bold text-accent">${pendingAmount.toLocaleString()}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-lg">Payment History</CardTitle>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-36">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="DEPOSIT">Deposit</SelectItem>
                      <SelectItem value="FINAL">Final</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-36">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="SUCCESS">Success</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="FAILED">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {filteredPayments.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Reference</TableHead>
                        <TableHead>Lot</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-mono text-sm">{payment.referenceNo}</TableCell>
                          <TableCell className="max-w-[150px] truncate">{payment.lot.title}</TableCell>
                          <TableCell>
                            <Badge variant={getTypeBadgeVariant(payment.paymentType)}>{payment.paymentType}</Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">${payment.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(payment.paymentStatus)}>
                              {payment.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right text-muted-foreground">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {payment.paymentStatus === "SUCCESS" && (
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-muted-foreground">No payments match your filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
