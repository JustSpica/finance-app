import { useForm } from "react-hook-form";
import { useLocation } from "wouter";

import { Button, Input } from "../../components";
import { api } from "../../lib/axios";

type UserForm = {
  name: string;
  email: string;
  password: string;
}

export function SignUpPage() {
  const { handleSubmit, register } = useForm<UserForm>();
  const [, setLocation] = useLocation();

  async function createUser(data: UserForm) {
    try {
      await api.post("/users/register", data)

      setLocation("/app")
    } catch(error) {
      console.error(error); 
    }
  }

  return (
    <section className="grid grid-cols-2 bg-zinc-900 h-screen">
      <div className="h-full bg-zinc-950" />
      <div className="px-16 py-16 space-y-6 flex flex-col justify-center">
        <h1 className="text-white font-semibold text-3xl">Crie uma conta</h1>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(createUser)}>
          <Input placeholder="Nome" {...register("name")} />
          <Input placeholder="Email" {...register("email")} />
          <Input placeholder="Senha" {...register("password")} />
          <Button type="submit" variant="primary">Cadastrar-se</Button>
        </form>
      </div>
    </section>
  );
}
