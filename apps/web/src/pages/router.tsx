import { Route, Switch } from 'wouter'

import { SignIn } from './sign-in'
import { SignUp } from './sign-up'

export function Router() {
  return (
    <Switch>
      <Route path="/sign-up" component={SignUp} />
      <Route path="/sign-in" component={SignIn} />
    </Switch>
  )
}
