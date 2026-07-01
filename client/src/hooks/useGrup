import { useMemo } from 'react'

export default function useGrupos(
  equipamentos:any[]
){

  const grupos = useMemo(() => {

    const agrupados = equipamentos.reduce(
      (acc,equipamento) => {

        const key =
          `${equipamento.marca}-${equipamento.modelo}-${equipamento.categoria_id}`

        if(!acc[key]){

          acc[key] = {
            marca:equipamento.marca,
            modelo:equipamento.modelo,
            categoria_id:equipamento.categoria_id,
            total:0,
            disponiveis:0,
            alugados:0,
            manutencao:0,
            danificados:0
          }

        }

        acc[key].total++

        if(
          equipamento.estado_actual === 'disponivel'
        ){
          acc[key].disponiveis++
        }

        if(
          equipamento.estado_actual === 'alugado'
        ){
          acc[key].alugados++
        }

        if(
          equipamento.estado_actual === 'manutencao'
        ){
          acc[key].manutencao++
        }

        if(
          equipamento.estado_actual === 'danificado'
        ){
          acc[key].danificados++
        }

        return acc

      },
      {} as Record<string,any>
    )

    return Object.values(
      agrupados
    )

  },[equipamentos])

  return {
    grupos
  }

}
