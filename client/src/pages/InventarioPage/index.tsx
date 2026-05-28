import { useEffect, useState } from 'react'
import axios from 'axios'

type Equipo = {
  id: number
  nome: string
  categoria: string
  marca: string
  modelo: string
  numero_serie: string
  estado: string
}

export default function InventarioPage() {
  const [equipos, setEquipos] = useState<Equipo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const obtenerEquipos = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/equipos'
        )

        setEquipos(
          Array.isArray(response.data)
            ? response.data
            : []
        )

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    obtenerEquipos()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        Cargando equipos...
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Inventario
          </h1>
          <p className="text-zinc-500 mt-1">
            Gestión de equipos de audio
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.isArray(equipos) && equipos.map((equipo) => (
          <div
            key={equipo.id}
            className="
              bg-white
              rounded-2xl
              border
              border-zinc-200
              p-5
              shadow-sm
            "
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold">
                  {equipo.nome}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  {equipo.categoria}
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
                    equipo.estado === 'disponivel'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }
                `}
              >
                {equipo.estado}
              </span>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Marca:  
                </span>

                <span className="font-medium">
                  {equipo.marca}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Modelo:
                </span>

                <span className="font-medium">
                  {equipo.modelo}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Serie:
                </span>

                 <span className="font-medium">
                  {equipo.numero_serie}
                </span>
                
              </div>
              <span className="text-zinc-500">
                  Estado:
                </span>
              <span className="font-medium">
                  {equipo.estado_actual}
                </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
