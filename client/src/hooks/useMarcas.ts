import { useEffect,useState } from 'react'
import api from '../services/api'

export default function useMarcas() {

  const [marcas,setMarcas] =
    useState<any[]>([])

  const carregarMarcas =
    async () => {

      try {

        const response =
          await api.get(
            '/config/marcas'
          )

        setMarcas(
          response.data
        )

      } catch(error) {

        console.error(error)

      }

    }

  useEffect(() => {

    carregarMarcas()

  }, [])

  return {
    marcas,
    carregarMarcas
  }

}
