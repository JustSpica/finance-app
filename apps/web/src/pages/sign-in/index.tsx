import { AxiosError } from 'axios'
import { ChevronRight, CircleDollarSign, CircleX, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'wouter'

import { Button, Input, Toast } from '@/components'
import { UsersService } from '@/services/users'

type SignInUserForm = {
  email: string
  password: string
}

export function SignIn() {
  const { handleSubmit, register } = useForm<SignInUserForm>()
  const [, setLocation] = useLocation()
  const [error, setError] = useState({
    state: false,
    message: ''
  })

  function onOpenChange(newState: boolean) {
    setError((prevState) => ({ ...prevState, state: newState }))
  }

  async function signIn(data: SignInUserForm) {
    try {
      const users = UsersService.make()

      const response = await users.auth(data)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user-id', response.data.id)

      setLocation('/app')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
        if (error.status === 401) {
          setError({
            message: 'O e-mail ou senha informados estão incorretos.',
            state: true
          })
        }
      }
    }
  }

  return (
    <>
      <section className="flex h-screen w-full items-center bg-zinc-950">
        <div className="mx-auto w-full max-w-[484px] space-y-8">
          <header>
            <CircleDollarSign className="text-white" size={32} />
            <h1 className="mb-2 mt-6 text-2xl font-bold text-white">
              Entre com a sua conta
            </h1>
            <span className="block text-sm text-zinc-400">
              Não possui uma conta ainda?{' '}
              <Link className="text-blue-500 hover:underline" href="/sign-up">
                Cadastre-se aqui
              </Link>
            </span>
          </header>

          <form onSubmit={handleSubmit(signIn)}>
            <div className="mt-4 space-y-2">
              <label
                className="text-sm font-medium text-zinc-400"
                htmlFor="companyName"
              >
                Email
              </label>
              <Input
                type="email"
                placeholder="JohnDoe@example.com"
                {...register('email')}
              />
            </div>

            <div className="mt-4 space-y-2">
              <label
                className="text-sm font-medium text-zinc-400"
                htmlFor="companyName"
              >
                Senha
              </label>
              <Input
                type="password"
                placeholder="••••••••••••"
                {...register('password')}
              />
            </div>

            <Button type="submit" className="mt-8 w-full font-medium">
              Entrar <ChevronRight size={18} />
            </Button>
          </form>
        </div>
      </section>

      <Toast.Root
        className="flex gap-3"
        open={error.state}
        onOpenChange={onOpenChange}
      >
        <Toast.Close />
        <CircleX className="text-red-500" size={20} />
        <div className="space-y-1">
          <Toast.Title className="flex items-center gap-1">
            <Sparkles className="text-zinc-400" size={16} />
            Notificação de erro
          </Toast.Title>
          <Toast.Description>{error.message}</Toast.Description>
        </div>
      </Toast.Root>
    </>
  )
}
