export function CategoryTable() {
  return (
    <div className="rounded-md border border-zinc-800">
      <table className="w-full">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="px-3 py-2 text-left align-middle text-sm font-medium text-zinc-400">
              Categoria
            </th>
            <th className="px-3 py-2 text-left align-middle text-sm font-medium text-zinc-400">
              Qtd. transações
            </th>
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          <tr className="border-b border-zinc-800">
            <td className="p-3 text-left align-middle text-sm text-white">
              Category 01
            </td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="p-3 text-left align-middle text-sm text-white">
              Category 02
            </td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="p-3 text-left align-middle text-sm text-white">
              Category 03
            </td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="p-3 text-left align-middle text-sm text-white">
              Category 04
            </td>
          </tr>
          <tr className="border-b border-zinc-800">
            <td className="p-3 text-left align-middle text-sm text-white">
              Category 05
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
