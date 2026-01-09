import { Suspense } from "react"
import { AdminBidsContent } from "@/components/admin/admin-bids-content"

export default function AdminBidsPage() {
  return (
    <Suspense fallback={null}>
      <AdminBidsContent />
    </Suspense>
  )
}
