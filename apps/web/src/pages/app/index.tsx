import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import { Button, Input } from "../../components";
import * as Dialog from "../../components/dialog";

export function AppPage() {
  return (
    <section className="bg-zinc-900 h-screen w-full">
      <div className="w-full h-[200px] bg-zinc-950 flex flex-col items-center">
        <header className="pt-8 w-full max-w-[1120px]">
          <Dialog.Dialog>
            <Dialog.DialogTrigger asChild>
              <Button className="float-right">Nova transação</Button>
            </Dialog.DialogTrigger>
            <Dialog.DialogContent>
              <Dialog.DialogTitle>Nova transação</Dialog.DialogTitle>
              <form className="flex flex-col space-y-4">
                <Input placeholder="Valor" />
                <Button type="submit" variant="primary">Adicionar</Button>
              </form>
            </Dialog.DialogContent>
          </Dialog.Dialog>
        </header>

        <div className="flex gap-4 mt-20">
          <div className="bg-zinc-800 text-white p-6 min-w-[250px] rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="block text-sm text-zinc-200">Entradas</span>
              <CircleArrowUp className="text-green-500" size={20} />
            </div>

            <strong className="block text-xl">R$ 17.000,40</strong>
          </div>

          <div className="bg-zinc-800 text-white p-6 min-w-[250px] rounded-md space-y-2">
            <div className="flex items-center justify-between">
              <span className="block text-sm text-zinc-200">Saídas</span>
              <CircleArrowDown className="text-red-500" size={20} />
            </div>

            <strong className="block text-xl">R$ 17.000,40</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
