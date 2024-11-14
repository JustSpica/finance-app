import { Router } from './pages/router'

import { Toast } from '@/components'

export function App() {
  return (
    <Toast.Provider>
      <Router />

      <Toast.Viewport />
    </Toast.Provider>
  )
}
