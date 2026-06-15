import { useMemo } from 'react'

export default function useAlugueisFilter(
  alugueis:any[],
  search:string,
  filtroStatus:string
){
  const filtrados = useMemo(() => {
  
    return alugueis.filter(
      aluguel => {
        const matchBusca =
          aluguel.cliente
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            )
            ||
            String(aluguel.id)
            .includes(search)

            const matchStatus =
              !filtroStatus ||
              aluguel.estado ===
              filtroStatus
            return(
              matchBusca && matchStatus
            )
      }
    )
  },[alugueis,
    search,
    filtroStatus
  ])
  return {
    filtrados
  }
}
