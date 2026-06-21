import { useEffect, useState } from 'react'
import api from '../services/api'

export default function useDashboardStats() {

  const [stats, setStats] = useState({
    totalEquipos: 0,
    equiposDisponiveis: 0,
    equiposAlugados: 0,
    equiposManutencao: 0,
    equipamentosDanificados: 0
  })

  const carregarStats = async () => {
    try {

      const response = await api.get(
        '/dashboard/stats'
      )

      setStats(response.data)

    } catch(error) {

      console.error(error)

    }
  }

  useEffect(() => {

    carregarStats()

  }, [])

  return stats

}
