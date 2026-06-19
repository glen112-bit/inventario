import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useAlugueis(){
  const [ alugueis, setAlugueis ] = useState<any[]>([])

  const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:3001/api'


  const carregarAlugueis = async () => {
    try{
      const response = await axios.get(`${API_URL}/alugueis`)
      setAlugueis(
        Array.isArray(response.data)
          ? response.data
          : []
      )
    }catch(error){
      console.error(error)
    }
  }

  const criarAluguel = async(payload:any) => {
    try{
      await axios.post(
        `${API_URL}/alugueis`,
        payload
      )
      await carregarAlugueis()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  const atualizarAluguel = async(payload:any ) => {
  console.log('update', payload)
    try {
    // console.log('update',payload)
      const response = await axios.put(
        `${API_URL}/alugueis/${payload.id}`,
       payload 

      )
      console.log('RESPONSE', response)
      await carregarAlugueis()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  const excluirAluguel =  async(aluguel:any) => {
    try{
      await axios.delete(
        `${API_URL}/alugueis/${aluguel.id}`
      )
      setAlugueis(prev => 
                  prev.filter(
                    item => item.id !== aluguel.id
        )
      )
    }catch(error){
      console.error(error)
      throw error
    }
  }
  useEffect(() => {
    carregarAlugueis()
  },[])
const finalizarAluguel = async (item:any) => {
  try {
    await axios.put(
      `${API_URL}/alugueis/${item.id}/finalizar`
    )

    await carregarAlugueis()

  } catch (error) {
    console.error(error)
  }
}

  return {
    alugueis,
    setAlugueis,
    carregarAlugueis,
    criarAluguel,
    atualizarAluguel,
    excluirAluguel,
    finalizarAluguel
  }
}
