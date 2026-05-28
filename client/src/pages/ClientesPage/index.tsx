import { useEffect, useState } from 'react'
import axios from 'axios'

type Cliente = {
  id: number
  nome: string
  email: string
  cargo: string
  tipo_usuario: string
}

export default function ClientesPage() {

  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {

    const obtenerClientes = async () => {

      try {

        const response = await axios.get(
          'http://localhost:3001/api/clientes'
        )

        setClientes(response.data)

      } catch (error) {

        console.error(error)
      }
    }

    obtenerClientes()

  }, [])

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Clientes
      </h1>

      <div className="space-y-4">

        {clientes.map((cliente) => (

          <div
            key={cliente.id}
            className="bg-white p-4 rounded-xl border"
          >

            <h2 className="font-semibold">
              {cliente.nome}
            </h2>

            <p>{cliente.email}</p>

            <p>{cliente.cargo}</p>

          </div>

        ))}

      </div>

    </div>
  )
}
