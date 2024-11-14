import { Route, Switch } from 'wouter'

import { AuthRoute } from './auth-route'

import { Dashboard } from './dashboard'
import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

export function Router() {
  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in">
        <AuthRoute redirect="/app">
          <SignIn />
        </AuthRoute>
      </Route>

      <Route path="/app">
        <AuthRoute hasToken redirect="/sign-in">
          <Dashboard />
        </AuthRoute>
      </Route>
    </Switch>
  )
}
