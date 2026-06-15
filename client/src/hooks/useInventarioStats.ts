import { useMemo } from 'react';

export default function useInventarioStats(
  equipos:any[]
){
  const stats = useMemo(() => {
    const total = equipos.length

    const disponiveis = equipos.filter(
      e => e.estado_actual === 'disponivel'
    ).length
    const manutencao = equipos.filter(
      e => e.estado_actual === 'manutencao'
    ).length 
    const alugados = equipos.filter(
      e => e.estado_actual === 'alugado'
    ).length   
    const danificados = equipos.filter(
      e => e.estado_actual === 'danificado'
    ).length
    return {
      total,
      disponiveis,
      manutencao,
      alugados,
      danificados
    }
  },[
    equipos
  ])
  return stats
}
