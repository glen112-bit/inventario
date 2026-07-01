import { useEffect, useState } from 'react'
import api from '../services/api'

export default function useUsuarios() {

  const [usuarios,setUsuarios] = useState<any[]>([])

  const carregarUsuarios =
    async () => {
      try {
        const response =
          await api.get(
            '/usuarios'
          )
        setUsuarios(
          Array.isArray(response.data)
            ? response.data
            : []
        )
      } catch(error) {
        console.error(error)
      }
    }

  const criarUsuario =
    async(payload:any) => {
      try {
        await api.post(
          '/usuarios',
          payload
        )
console.log('PAYLOAD:', payload)
        await carregarUsuarios()
      } catch(error) {
        console.error(error)
        throw error
      }
    }

  const atualizarUsuario =
    async(
      id:number,
      payload:any
    ) => {
      try {
        await api.put(
          `/usuarios/${id}`,
          payload
        )
        await carregarUsuarios()
      } catch(error) {
        console.error(error)
        throw error
      }
    }

  const excluirUsuario =
    async(id:number) => {
      try {
        await api.delete(
          `/usuarios/${id}`
        )
        setUsuarios(prev =>
          prev.filter(
            item => item.id !== id
          )
        )
      } catch(error) {
        console.error(error)
        throw error
      }
    }
  useEffect(() => {

    carregarUsuarios()

  }, [])

  return {
    usuarios,
    carregarUsuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
  }
}
