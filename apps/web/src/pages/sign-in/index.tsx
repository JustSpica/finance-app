import { ChevronRight, CircleDollarSign } from 'lucide-react'
import { Link } from 'wouter'

import { Button, Input } from '@app/components'

export function SignIn() {
  return (
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

        <form>
          <div className="mt-4 space-y-2">
            <label
              className="text-sm font-medium text-zinc-400"
              htmlFor="companyName"
            >
              Email
            </label>
            <Input type="email" placeholder="JohnDoe@example.com" />
          </div>

          <div className="mt-4 space-y-2">
            <label
              className="text-sm font-medium text-zinc-400"
              htmlFor="companyName"
            >
              Senha
            </label>
            <Input type="password" placeholder="••••••••••••" />
          </div>

          <Button className="mt-8 w-full font-medium">
            Entrar <ChevronRight size={18} />
          </Button>
        </form>
      </div>
    </section>
  )
}
