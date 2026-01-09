"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Gavel, User, Menu, X } from "lucide-react"
import { useState } from "react"

export function AuctionHeader() {
  const { user, isAuthenticated, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/auctions" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Gavel className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">BidVault</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/auctions"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Auctions
          </Link>
          <Link
            href="/auctions?status=live"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Live Now
          </Link>
          <Link
            href="/auctions?status=upcoming"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Upcoming
          </Link>
        </nav>

        {/* Auth Section */}
        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <User className="h-4 w-4" />
                  <span>{user?.fullName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-bids">My Bids</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/payments">Payments</Link>
                </DropdownMenuItem>
                {user?.role === "ADMIN" && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/admin">Admin Panel</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            <Link
              href="/auctions"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Auctions
            </Link>
            <Link
              href="/auctions?status=live"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Live Now
            </Link>
            <Link
              href="/auctions?status=upcoming"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Upcoming
            </Link>
            <div className="my-2 border-t border-border" />
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/my-bids"
                  className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Bids
                </Link>
                <button
                  className="rounded-lg px-4 py-2 text-left text-sm font-medium hover:bg-secondary"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-secondary"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
