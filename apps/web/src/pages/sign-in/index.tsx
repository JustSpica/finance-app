import { AxiosError } from 'axios'
import { ChevronRight, CircleDollarSign } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'wouter'

import { Button, Input } from '@/components'

import { useToast } from '@/components/toast/use-toast'

import * as UsersService from '@/services/users'

type AuthenticateUserForm = {
  email: string
  password: string
}

export function SignIn() {
  const { handleSubmit, register } = useForm<AuthenticateUserForm>()
  const [, setLocation] = useLocation()

  const { toast } = useToast()

  async function signIn(data: AuthenticateUserForm) {
    try {
      const response = await UsersService.authenticate(data)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user-id', response.data.user.id)

      setLocation('/app')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
        if (error.status === 401) {
          return toast({
            description: 'O e-mail ou senha informados estão incorretos.',
            title: 'Notificação de erro',
            variant: 'error'
          })
        }

        return toast({
          description: 'Ocorreu um erro ao fazer o seu login.',
          title: 'Notificação de erro',
          variant: 'error'
        })
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
                htmlFor="email"
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
                htmlFor="password"
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
    </>
  )
}
