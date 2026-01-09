import { Suspense } from "react"
import { AdminLotsContent } from "@/components/admin/admin-lots-content"

export default function AdminLotsPage() {
  return (
    <Suspense fallback={null}>
      <AdminLotsContent />
    </Suspense>
  )
}
