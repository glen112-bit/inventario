import { useEffect, useState } from 'react'
import api from '../services/api'

export default function useAlugueis(){
  const [ alugueis, setAlugueis ] = useState<any[]>([])

  const carregarAlugueis = async () => {
    try{
      const response = await api.get(
        `/alugueis` 
      )
      // console.log(JSON.stringify(response.data, null, 2))
      setAlugueis(
        Array.isArray(response.data)
          ? response.data
          : []
      )
    }catch(error){
      console.error(error)
    }
    // console.log(alugueis)
  }
  const buscarAluguel = async(id:number) => {
    try{
      const {data} = await api.get(`/alugueis/${id}`)
      // console.log(data)
      return data
    } catch (error) {
      console.error(error)
      throw error
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
    // console.log('update', payload)
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
      await api.put(`/alugueis/${item.id}/finalizar`)
      await carregarAlugueis()

    } catch (error) {
      console.error(error)
    }
    // useEffect(() => {
    // carregarAlugueis()
    // },[])
  }

  return {
    alugueis,
    setAlugueis,
    carregarAlugueis,
    criarAluguel,
    buscarAluguel,
    atualizarAluguel,
    excluirAluguel,
    finalizarAluguel
  }
}
