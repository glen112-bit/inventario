import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useClientes(){
  const [ clientes, setClientes ] = useState([])

  const carregarClientes = async() => {
    try{
      const response = await axios.get(
       'http://localhost:3001/api/clientes'
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
      await axios.post(
       'http://localhost:3001/api/clientes',
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
      await axios.put(
       `http://localhost:3001/api/clientes/${id}`,
        payload  
      )
      await carregarClientes()
    }catch(error){
      console.error(error)
      throw error
    }
  }
  const excluirCliente = 
    async(id:number) => {
    try{
      await axios.delete(
        `http://localhost:3001/api/clientes/${id}` 
      )
        setClientes( prev =>
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
