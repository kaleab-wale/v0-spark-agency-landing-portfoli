import type { ReactNode } from "react"
import { AuthProvider } from "@/lib/auth-context"
import { AuctionHeader } from "@/components/auction/header"
import { AuctionFooter } from "@/components/auction/footer"

export default function AuctionLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <AuctionHeader />
        <main className="flex-1">{children}</main>
        <AuctionFooter />
      </div>
    </AuthProvider>
  )
}
