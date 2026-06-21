import { useEffect,useState } from 'react'
import api from '../services/api'

export default function useLocalizacoes() {
  const [localizacoes,setLocalizacoes] =
    useState<any[]>([])
  const carregarLocalizacoes =
    async () => {
      try {
        const response =
          await api.get(
            '/config/localizacoes'
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
  
const criarLocalizacao = async (
  payload:any
) => {

  try {

    await api.post(
      '/config/localizacoes',
      payload
    )

    await carregarLocalizacoes()

  } catch(error){

    console.error(error)
    throw error

  }

}
  return {
    localizacoes,
    carregarLocalizacoes,
    criarLocalizacao
  }
}
