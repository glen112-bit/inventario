import { useMemo } from 'react'

export default function useEquipamentosFilter(
  equipos:any[],
  search:string,
  filtroStatus:string
){

  const filtrados = useMemo(() => {
    const text = (search || '').toLowerCase()

    return equipos.filter(
      e => {
        const matchBusca =
          (e.codigo_interno || '') 
        .toLowerCase()
        .includes(text)
        ||
          (e.numero_serie || '')   
        .toLowerCase()
        .includes(text)
        ||
          (e.marca || '') 
        .toLowerCase()
        .includes(text)
        ||
          (e.modelo || '') 
        .toLowerCase()
        .includes(text)

        const matchStatus =
          !filtroStatus ||
          (
            filtroStatus === 'disponivel' &&
              Number(e.disponiveis || 0) > 0
        )||(
            filtroStatus === 'alugado' &&
              Number(e.alugados || 0) > 0
        )||(
            filtroStatus === 'manutencao' &&
              Number(e.manutencao || 0) > 0
        )||(
            filtroStatus === 'danificado' &&
              Number(e.danificado || 0) > 0
        )

        return matchBusca &&  matchStatus
      })
  },[
    equipos,
    search,
    filtroStatus
  ])
  return{
    filtrados
  }
}
