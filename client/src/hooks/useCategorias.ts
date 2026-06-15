import { useEffect,useState } from 'react'
import axios from 'axios'

export default function useCategorias() {

  const [categorias, setCategorias] =
    useState<any[]>([])

  const carregarCategorias = async () => {
      try {
        const response =
          await axios.get(
            'http://localhost:3001/api/config/categorias'
          )
        setCategorias(
          response.data
        )
      } catch(error) {
        console.error(error)
      }
    }

  const criarCategoria = async (
    payload:any
  ) => {
    try {
      await axios.post(
        'http://localhost:3001/api/config/categorias',
        payload
      )
      await carregarCategorias()
    } catch(error) {
      console.error(error)
      throw error
    }
  }

  const atualizarCategoria = async(
    id:number,
    payload:any
  ) => {
    try{
      await axios.put(
        `http://localhost:3001/api/config/categorias/${id}`,
        payload  
      )
      await carregarCategorias()
    }catch(error){
      console.error(error)
      throw error
    }
  }
  const excluirCategoria = 
    async(id:number) => {
    try{
      await axios.delete(
        `http://localhost:3001/api/config/categorias/${id}` 
      )
        setCategorias( prev =>
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

    carregarCategorias()

  }, [])

  return {
    categorias,
    carregarCategorias,
    criarCategoria,
    atualizarCategoria,
    excluirCategoria
  }
}
