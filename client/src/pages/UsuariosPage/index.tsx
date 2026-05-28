import { useEffect, useState } from 'react'
import axios from 'axios'

type Usuario = {
  id: number
  nome: string
  email: string
  cargo: string
  tipo_usuario: string
}

export default function UsuariosPage() {

  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  useEffect(() => {

    const obtenerUsuarios = async () => {

      try {

        const response = await axios.get(
          'http://localhost:3001/api/usuarios'
        )

        setUsuarios(response.data)
console.log(usuarios)
      } catch (error) {

        console.error(error)
      }
    }

    obtenerUsuarios()

  }, [])

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Usuarios
      </h1>

      <div className="space-y-4">

        {usuarios.map((usuario) => (

          <div
            key={usuario.id}
            className="bg-white p-4 rounded-xl border"
          >

            <h2 className="font-semibold">
              {usuario.nome}
            </h2>

            <p>{usuario.email}</p>

            <p>{usuario.cargo}</p>

          </div>

        ))}

      </div>

    </div>
  )
}
