import { useMemo } from 'react'

export default function useInventarioStats(grupos: any) {


  const lista = Array.isArray(grupos) ? grupos : []

  return useMemo(() => {

    return lista.reduce(
      (acc, item) => {

        acc.total += Number(item.total || 0)
        acc.disponiveis += Number(item.disponiveis || 0)
        acc.alugados += Number(item.alugados || 0)
        acc.manutencao += Number(item.manutencao || 0)
        acc.danificados += Number(item.danificados || 0)

        return acc

      },
      {
        total: 0,
        disponiveis: 0,
        alugados: 0,
        manutencao: 0,
        danificados: 0
      }
    )

  }, [lista])

}
