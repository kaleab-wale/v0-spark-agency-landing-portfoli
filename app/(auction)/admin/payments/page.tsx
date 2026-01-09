import { Suspense } from "react"
import { AdminPaymentsContent } from "@/components/admin/admin-payments-content"

export default function AdminPaymentsPage() {
  return (
    <Suspense fallback={null}>
      <AdminPaymentsContent />
    </Suspense>
  )
}
