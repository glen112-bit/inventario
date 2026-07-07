import { useMemo } from 'react'

export default function useEquipamentosFilter(
  equipos: any[],
  search: string,
  filtroStatus: string
) {
  const filtrados = useMemo(() => {
    const text = search.toLowerCase()
    return equipos.filter((e) => {
      const matchBusca =
        (e.codigo_interno ?? '').toLowerCase().includes(text) ||
        (e.numero_serie ?? '').toLowerCase().includes(text) ||
        (e.marca ?? '').toLowerCase().includes(text) ||
        (e.modelo ?? '').toLowerCase().includes(text)

      let matchStatus = true
      if (filtroStatus) {
        // Equipos individuales
        if (e.estado_actual) {
          matchStatus =
            e.estado_actual === filtroStatus
        }
        // Grupos del resumen
        else {
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
            default:
              matchStatus = true
          }
        }
      }
      return matchBusca && matchStatus
    })
  }, [equipos, search, filtroStatus])
  return {
    filtrados
  }

}
