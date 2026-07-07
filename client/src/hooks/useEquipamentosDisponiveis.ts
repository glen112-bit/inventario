import { useEffect, useState } from 'react'
import api from '../services/api'

export default function useEquipamentosDisponiveis() {

  const [equipamentos, setEquipamentos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const carregarEquipamentos = async () => {

    try {

      setLoading(true)

      const { data } = await api.get('/inventario')

      setEquipamentos(data)

    } catch (error) {

      console.error(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    carregarEquipamentos()

  }, [])

  const equipamentosDisponiveis = equipamentos.filter(
    equipamento =>
      equipamento.estado_actual === 'disponivel'
  )

  return {
    equipamentos,
    equipamentosDisponiveis,
    loading,
    carregarEquipamentos
  }

}
