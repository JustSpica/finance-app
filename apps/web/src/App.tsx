import { QueryClientProvider } from '@tanstack/react-query'

import { Toaster } from '@/components/toast/toaster'
import { queryClient } from '@/lib/react-query'

import { Router } from './pages/router'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster>
        <Router />
      </Toaster>
    </QueryClientProvider>
  )
}
