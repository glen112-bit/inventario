import { useEffect,useState } from 'react'
import axios from 'axios'

export default function useLocalizacoes() {
  const [localizacoes,setLocalizacoes] =
    useState<any[]>([])
  const carregarLocalizacoes =
    async () => {
      try {
        const response =
          await axios.get(
            'http://localhost:3001/api/config/localizacoes'
          )
        setLocalizacoes(
          response.data
        )
      } catch(error) {
        console.error(error)
      }
    }
  useEffect(() => {
    carregarLocalizacoes()
  }, [])
  return {
    localizacoes,
    carregarLocalizacoes
  }
}
