import { Route, Switch } from "wouter"

import { AppPage } from "./app"
import { SignUpPage } from "./sign-up"

export function Router() {
  return (
    <Switch>
      <Route path="/app">
        <AppPage />
      </Route>
      <Route path="/sign-up">
        <SignUpPage />
      </Route>
    </Switch>
  )
}