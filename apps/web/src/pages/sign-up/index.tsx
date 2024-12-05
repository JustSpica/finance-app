import { AxiosError } from 'axios'
import { CircleDollarSign } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'wouter'

import { Button, Input } from '@/components'

import { useToast } from '@/components/toast/use-toast'

import * as UsersService from '@/services/users'

type SignUpUserForm = {
  email: string
  password: string
  username: string
}

export function SignUp() {
  const { handleSubmit, register } = useForm<SignUpUserForm>()
  const [, setLocation] = useLocation()

  const { toast } = useToast()

  async function createUser(data: SignUpUserForm) {
    try {
      const response = await UsersService.create(data)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user-id', response.data.user.id)

      setLocation('/app')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error)
        if (error.status === 409) {
          toast({
            description: 'O e-mail informado já está cadastrado.',
            title: 'Notificação de erro',
            variant: 'error'
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
              Crie sua conta
            </h1>
            <span className="block text-sm text-zinc-400">
              Já possui uma conta?{' '}
              <Link className="text-blue-500 hover:underline" href="/sign-in">
                Entre aqui
              </Link>
            </span>
          </header>

          <form onSubmit={handleSubmit(createUser)}>
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-zinc-400"
                htmlFor="companyName"
              >
                Nome de usuário
              </label>
              <Input placeholder="John Doe" {...register('username')} />
            </div>

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
                placeholder="••••••••"
                {...register('password')}
              />
            </div>

            <Button type="submit" className="mt-8 w-full font-medium">
              Criar conta
            </Button>
          </form>
        </div>
      </section>
    </>
  )
}
