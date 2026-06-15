import { useEffect,useState } from 'react'
import axios from 'axios'

export default function useEquipamentos() {

  const [equipos,setEquipos] =
    useState<any[]>([])

  const carregarEquipamentos =
    async () => {
      try {
        const response =
          await axios.get(
            'http://localhost:3001/api/inventario'
          )
        setEquipos(
          response.data
        )
      } catch(error) {
        console.error(error)
      }
    }

  const criarEquipamento =
    async (payload:any) => {
      try {
        await axios.post(
          'http://localhost:3001/api/inventario',
          payload
        )
        await carregarEquipamentos()
      } catch(error) {
        console.error(error)
        throw error
      }
    }

  const alterarEstado =
    async (
      equipamento_id:number,
      estado_actual:string,
      observacao:string
    ) => {
      try {
        await axios.put(
          `http://localhost:3001/api/config/equipamentos/${equipamento_id}/estado`,
          {
            estado_actual,
            observacao
          }
        )
        setEquipos(prev =>
          prev.map(item =>
            item.equipamento_id === equipamento_id
              ? {
                  ...item,
                  estado_actual
                }
              : item
          )
        )
      } catch(error) {
        console.error(error)
        throw error
      }
    }
  useEffect(() => {
    carregarEquipamentos()
  }, [])

  return {
    equipos,
    setEquipos,
    carregarEquipamentos,
    criarEquipamento,
    alterarEstado
  }
}
