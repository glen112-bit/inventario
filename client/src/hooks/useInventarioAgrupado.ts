import { useEffect, useState } from 'react'
import api from '../services/api'

export default function useInventarioAgrupado() {
  const [grupos, setGrupos] = useState<any[]>([])

  const carregarGrupos = async () => {
    try {
      const { data } = await api.get(
        '/inventario/agrupado'
      )
      setGrupos(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    carregarGrupos()
  }, [])

  return {
    grupos,
    setGrupos,
    carregarGrupos
  }

}
