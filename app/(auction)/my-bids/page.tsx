import { Suspense } from "react"
import { MyBidsContent } from "@/components/dashboard/my-bids-content"

export default function MyBidsPage() {
  return (
    <Suspense fallback={null}>
      <MyBidsContent />
    </Suspense>
  )
}
