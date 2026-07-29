import { useEffect, useState } from 'react'
import api from '../services/api'

export default function useUsuarios() {

  const [usuarios, setUsuarios] = useState<any[]>([])

  const carregarUsuarios = async () => {
    try {

      const { data } = await api.get('/usuarios')

      setUsuarios(
        Array.isArray(data)
          ? data
          : []
      )

    } catch (error) {

      console.error(error)

    }
  }

  const buscarUsuario = async (id:number) => {
    try {

      const { data } = await api.get(
        `/usuarios/${id}`
      )

      return data

    } catch (error) {

      console.error(error)
      throw error

    }
  }

  const criarUsuario = async (payload:any) => {
    try {

      await api.post(
        '/usuarios',
        payload
      )

      await carregarUsuarios()

    } catch (error) {

      console.error(error)
      throw error

    }
  }

  const atualizarUsuario = async (
    id:number,
    payload:any
  ) => {
    try {
  console.log("ENVIANDO:" );
  console.trace();
  console.log(payload);

      await api.put(
        `/usuarios/${id}`,
        payload
      )

      await carregarUsuarios()

    } catch (error) {

      console.error(error)
      throw error

    }
  }

  const alterarSenha = async (
    id:number,
    password:string
  ) => {
    try {

      await api.put(
        `/usuarios/${id}/senha`,
        {
          password
        }
      )

    } catch (error) {

      console.error(error)
      throw error

    }
  }

  const alterarStatus = async (
    id:number,
    ativo:boolean
  ) => {
    try {

      await api.put(
        `/usuarios/${id}/status`,
        {
          ativo
        }
      )

      await carregarUsuarios()

    } catch (error) {

      console.error(error)
      throw error

    }
  }

  const excluirUsuario = async (
    id:number
  ) => {
    try {

      await api.delete(
        `/usuarios/${id}`
      )

      setUsuarios(prev =>
        prev.filter(
          usuario => usuario.id !== id
        )
      )

    } catch (error) {

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

    buscarUsuario,

    criarUsuario,

    atualizarUsuario,

    alterarSenha,

    alterarStatus,

    excluirUsuario

  }

}
