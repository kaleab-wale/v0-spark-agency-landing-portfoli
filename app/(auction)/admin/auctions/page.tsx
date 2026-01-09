import { Suspense } from "react"
import { AdminAuctionsContent } from "@/components/admin/admin-auctions-content"

export default function AdminAuctionsPage() {
  return (
    <Suspense fallback={null}>
      <AdminAuctionsContent />
    </Suspense>
  )
}
