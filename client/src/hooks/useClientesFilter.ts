import { useMemo } from 'react'

export default function useClientesFilter(
  clientes:any[],
  search:string,
  filtroStatus:string
) {

  const filtrados = useMemo(() => {
    const busca =
      search.toLowerCase()
    return clientes.filter(
      cliente => {
        const matchBusca =
          cliente.nome
            ?.toLowerCase()
            ?.includes(busca)
          ||
          cliente.documento
            ?.toLowerCase()
            ?.includes(busca)
          ||
          cliente.telefone
            ?.toLowerCase()
            ?.includes(busca)
          ||
          cliente.email
            ?.toLowerCase()
            ?.includes(busca)
          ||
          cliente.endereco
            ?.toLowerCase()
            ?.includes(busca)

        const matchStatus =
          !filtroStatus
          ||
          (
            filtroStatus === 'ativo'
            &&
            cliente.ativo === true
          )
          ||
          (
            filtroStatus === 'inativo'
            &&
            cliente.ativo === false
          )
        return (
          matchBusca &&
          matchStatus
        )
      }
    )
  }, [
    clientes,
    search,
    filtroStatus
  ])

  return {
    filtrados
  }

}
