import { useMemo } from 'react'

export default function useAlugueisKpis(
  alugueis:any[]
) {
  const kpis = useMemo(() => {
    const ativos = 
      alugueis.filter(
        item => item.estado === 'ativo'
    ).length
    const reservados = 
      alugueis.filter(
        item => item.estado === 'reservado'
    ).length
    const retornados = 
      alugueis.filter(
        item => item.estado === 'retornado'
    ).length
    const cancelados = 
      alugueis.filter(
        item => item.estado === 'cancelado'
    ).length

    return {
      ativos,
      reservados,
      retornados,
      cancelados,
      total: alugueis.length
    }
  }, [alugueis])  

  return kpis
}
