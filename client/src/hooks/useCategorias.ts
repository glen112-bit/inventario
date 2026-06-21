import { useEffect,useState } from 'react'
import api from '../services/api'

export default function useCategorias() {

  const [categorias, setCategorias] =
    useState<any[]>([])

  const carregarCategorias = async () => {
      try {
        const response =
          await api.get(
            'config/categorias'
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
      await api.post(
        'config/categorias',
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
      await api.put(
        `config/categorias/${id}`,
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
      await api.delete(
        `config/categorias/${id}` 
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
