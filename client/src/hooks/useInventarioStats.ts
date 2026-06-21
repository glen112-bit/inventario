import { useMemo } from 'react'

export default function useInventarioStats(
  equipos:any[]
){
  // console.log(equipos)
  const stats = useMemo(() => {
    const total = equipos.reduce(
      (acc, item) =>
        acc + Number(item.quantidade || 0),
      0
    )
    const disponiveis = equipos.reduce(
      (acc, item) =>
        acc + Number(item.disponiveis || 0),
      0
    )
    const alugados = equipos.reduce(
      (acc, item) =>
        acc + Number(item.alugados || 0),
      0
    )
    const manutencao = equipos.reduce(
      (acc, item) =>
        acc + Number(item.manutencao || 0),
      0
    )
    const danificados = equipos.reduce(
      (acc, item) =>
        acc + Number(item.danificados || 0),
      0
    )

    return {
      total,
      disponiveis,
      alugados,
      manutencao,
      danificados
    }

  }, [equipos])

  return stats

}
