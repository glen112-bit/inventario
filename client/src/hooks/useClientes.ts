import { useState, useEffect } from 'react'
import api from '../services/api'

export default function useClientes(){
  const [ clientes, setClientes ] = useState([])

  const carregarClientes = async() => {
    try{
      const response = await api.get(
       '/clientes'
      )
      setClientes(
        Array.isArray(response.data)
          ? response.data
          :[]
      )
    } catch(error){
      console.error(error)
      throw error
    }
  }

  const criarCliente = async(payload:any) => {
    try{
      await api.post(
       '/clientes',
        payload 
      )
      await carregarClientes()
    }catch(error){
      console.error(error)
      throw error
    }
  }
  const atualizarCliente = async(
    id:number,
    payload:any
  ) => {
    try{
      await api.put(
       `/clientes/${id}`,
        payload  
      )
      await carregarClientes()
    }catch(error){
      console.error(error)
      throw error
    }
  }
const excluirCliente = async (valor: any) => {

  const id =
    typeof valor === 'object'
      ? valor.id
      : valor

  console.log('ID final:', id)

  await api.delete(`/clientes/${id}`)

  setClientes(prev =>
    prev.filter(item => item.id !== id)
  )
}


  useEffect(() => {
    carregarClientes()
  },[])
  return { 
  clientes, 
  setClientes,
  carregarClientes,
  criarCliente,
  atualizarCliente,
  excluirCliente
  }
}
