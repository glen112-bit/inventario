import { useEffect,useState } from 'react'
import axios from 'axios'

export default function useMarcas() {

  const [marcas,setMarcas] =
    useState<any[]>([])

  const carregarMarcas =
    async () => {

      try {

        const response =
          await axios.get(
            'http://localhost:3001/api/config/marcas'
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
