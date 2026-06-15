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
          e.estado_actual ===
          filtroStatus

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
