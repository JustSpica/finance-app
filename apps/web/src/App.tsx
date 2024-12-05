import { QueryClientProvider } from '@tanstack/react-query'
import { Router } from './pages/router'

import { Toast } from '@/components'
import { queryClient } from '@/lib/react-query'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider>
        <Router />

        <Toast.Viewport />
      </Toast.Provider>
    </QueryClientProvider>
  )
}
