import { useEffect, useState } from 'react'
import api from '../services/api'

export default function useAlugueis(){
  const [ alugueis, setAlugueis ] = useState<any[]>([])

  // const API_URL =
    // import.meta.env.VITE_API_URL ||
    // 'http://localhost:3001/api'
  // const token = localStorage.getItem('token')


  const carregarAlugueis = async () => {
    try{
      const response = await api.get(
        `/alugueis` 
      )
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
      await api.post(
        `/alugueis`,
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
      const response = await api.put(
        `/alugueis/${payload.id}`,
        payload 

      )
      // console.log('RESPONSE', response)
      await carregarAlugueis()
    }catch(error){
      console.error(error)
      throw error
    }
  }

  const excluirAluguel =  async(aluguel:any) => {
    try{
      await api.delete(
        `/alugueis/${aluguel.id}`
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
      await api.put(
        `/alugueis/${item.id}/finalizar`
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
