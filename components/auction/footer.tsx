import Link from "next/link"
import { Gavel } from "lucide-react"

export function AuctionFooter() {
  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/auctions" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Gavel className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold tracking-tight">BidVault</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Premium auction platform for collectors and enthusiasts worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold">Auctions</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/auctions" className="text-sm text-muted-foreground hover:text-foreground">
                  All Auctions
                </Link>
              </li>
              <li>
                <Link href="/auctions?status=live" className="text-sm text-muted-foreground hover:text-foreground">
                  Live Now
                </Link>
              </li>
              <li>
                <Link href="/auctions?status=upcoming" className="text-sm text-muted-foreground hover:text-foreground">
                  Upcoming
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold">Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/register" className="text-sm text-muted-foreground hover:text-foreground">
                  Register to Bid
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold">Support</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BidVault. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
