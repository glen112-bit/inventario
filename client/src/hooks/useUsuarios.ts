import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useUsuarios() {

  const [usuarios,setUsuarios] = useState<any[]>([])
  const carregarUsuarios =
    async () => {
      try {
        const response =
          await axios.get(
            'http://localhost:3001/api/usuarios'
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
        await axios.post(
          'http://localhost:3001/api/usuarios',
          payload
        )
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
        await axios.put(
          `http://localhost:3001/api/usuarios/${id}`,
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
        await axios.delete(
          `http://localhost:3001/api/usuarios/${id}`
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
