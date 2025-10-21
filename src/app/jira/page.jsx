import { JiraIntegration } from '@/components/integrations/JiraIntegration'
import { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <JiraIntegration/>
    </Suspense>
  )
}
