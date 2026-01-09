"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Gavel, Package, DollarSign, Users, ChevronLeft, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense } from "react"

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/auctions", label: "Auctions", icon: Gavel },
  { href: "/admin/lots", label: "Lots", icon: Package },
  { href: "/admin/bids", label: "Bids", icon: DollarSign },
  { href: "/admin/payments", label: "Payments", icon: DollarSign },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

function SidebarContent() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-border px-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/auctions">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <span className="font-semibold">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export function AdminSidebar() {
  return (
    <Suspense fallback={<aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block" />}>
      <SidebarContent />
    </Suspense>
  )
}
