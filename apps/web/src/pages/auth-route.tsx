import { Redirect } from 'wouter'

export type AuthRouteProps = {
  children: React.ReactNode
  hasToken?: boolean
  redirect: string
}

export function AuthRoute({ children, hasToken, redirect }: AuthRouteProps) {
  const token = localStorage.getItem('token')

  if (hasToken) {
    return token ? children : <Redirect to={redirect} />
  }

  return !token ? children : <Redirect to={redirect} />
}
