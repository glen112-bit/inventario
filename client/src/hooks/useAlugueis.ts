import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useAlugueis(){
  const [ alugueis, setAlugueis ] = useState<any[]>([])

  const carregarAlugueis = async () => {
    try{
      const response = await axios.get('http://localhost:3001/api/alugueis')
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
        'http://localhost:3001/api/alugueis',
        payload
      )
      await carregarAlugueis()
    }catch(error){
      console.error(error)
      throw error
    }
  }
  const atualizarAluguel = async(
    id:number,
    payload:any
  ) => {
    try {
      await axios.put(
        `http://localhost:3001/api/alugueis/${id}`,
         payload
      )
      await carregarAlugueis()
    }catch(error){
      console.error(error)
      throw error
    }
  }
  const excluirAluguel = 
    async(id:number) => {
    try{
      await axios.delete(
         `http://localhost:3001/api/alugueis/${id}`
      )
         setAlugueis(prev => 
                     prev.filter(
                       item => item.id !== id
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
  return {
    alugueis,
    setAlugueis,

    carregarAlugueis,
    criarAluguel,
    atualizarAluguel,
    excluirAluguel
  }
}
