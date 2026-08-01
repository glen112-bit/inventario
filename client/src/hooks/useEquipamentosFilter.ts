import { useMemo } from 'react'

export default function useEquipamentosFilter(
  equipos: any,
  search: string,
  filtroStatus: string
) {

  const lista = Array.isArray(equipos)
    ? equipos
    : []

  const filtrados = useMemo(() => {

    const text = search.toLowerCase()

    return lista.filter((e) => {

      const matchBusca =
        (e.codigo_interno ?? '').toLowerCase().includes(text) ||
        (e.numero_serie ?? '').toLowerCase().includes(text) ||
        (e.marca ?? '').toLowerCase().includes(text) ||
        (e.modelo ?? '').toLowerCase().includes(text)

      let matchStatus = true

      if (filtroStatus) {

        if (e.estado_actual) {
          matchStatus = e.estado_actual === filtroStatus
        } else {
          switch (filtroStatus) {
            case 'disponivel':
              matchStatus = Number(e.disponiveis) > 0
              break
            case 'alugado':
              matchStatus = Number(e.alugados) > 0
              break
            case 'manutencao':
              matchStatus = Number(e.manutencao) > 0
              break
            case 'danificados':
              matchStatus = Number(e.danificados) > 0
              break
          }
        }

      }

      return matchBusca && matchStatus

    })

  }, [lista, search, filtroStatus])

  return { filtrados }

}
