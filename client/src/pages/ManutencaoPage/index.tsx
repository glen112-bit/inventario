import { useEffect, useState } from 'react'
import axios from 'axios'
import { Wrench, Calendar, AlertTriangle } from 'lucide-react'

type Manutencao = {
  id: number
  equipamento: string
  estado: string
  status: string
  data_manutencao: string
  observacoes: string
}

export default function ManutencaoPage() {
  const [manutencoes, setManutencoes] = useState<Manutencao[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obterManutencoes = async () => {
      try {
        const response = await axios.get(
          '/api/manutencao'
        )

        setManutencoes(
          Array.isArray(response.data)
            ? response.data
            : []
        )
console.log(manutencoes)
      } catch (error) {
        console.error(error)

      } finally {
        setLoading(false)
      }
    }

    obterManutencoes()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        Carregando manutenções...
      </div>
    )
  }

  return (
    <div className="p-6">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Wrench size={32} />
            Manutenção
          </h1>

          <p className="text-zinc-500 mt-2">
            Controle de manutenção dos equipamentos
          </p>

        </div>

        <button
          className="
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            hover:bg-zinc-800
            transition-all
          "
        >
          Nova manutenção
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {manutencoes.map((manutencao) => (

          <div
            key={manutencao.id}
            className="
              bg-white
              border
              border-zinc-200
              rounded-2xl
              p-5
              shadow-sm
            "
          >

            <div className="flex items-start justify-between">

              <div>

                <p className="text-zinc-500 text-sm mt-1">
                 Equipo: {manutencao.equipamento}
                </p>
                 <p className="text-zinc-500 text-sm mt-1">
                  Costo: {manutencao.costo}
                </p>
                <p className="text-zinc-500 text-sm mt-1">
                  Descricao: {manutencao.descripcion}
                </p>
                <p className="text-zinc-500 text-sm mt-1">
                  Tipo: {manutencao.tipo}
                </p>
                 <p className="text-zinc-500 text-sm mt-1">
                  Estado: {manutencao.estado}
                </p>

              </div>

              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-xs
                  font-medium
                  ${
                    manutencao.status === 'concluida'
                      ? 'bg-green-100 text-green-700'
                      : manutencao.status === 'pendente'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                  }
                `}
              >
                {manutencao.status}
              </span>

            </div>

            <div className="mt-5 space-y-3">

              <div className="flex items-center gap-2 text-sm text-zinc-600">
                <Calendar size={16} />
                {manutencao.data_manutencao}
              </div>

              <div className="flex items-start gap-2 text-sm text-zinc-600">
                <AlertTriangle size={16} />

                <span>
                  {manutencao.observacoes}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}
