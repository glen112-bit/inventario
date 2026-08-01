import { useEffect,useState } from 'react'
import api from '../services/api'

export default function useEquipamentos() {

  // const [ form, setForm ] = useState()
  const [ equipos,setEquipos ] = useState<any[]>([])

  const carregarEquipamentos =
    async () => {
    try {
      const response = await api.get('/inventario')

      setEquipos(response.data)

    } catch(error) {
      console.error(error)
    }
  }

  const criarEquipamento =
    async (payload:any) => {
    // console.log('payload: ', payload)
    try {
      await api.post('/inventario', payload)

      await carregarEquipamentos()

    } catch(error) {

      console.error(error)
      throw error

    }
  }

const obterEquipamento = async (equipamento_id: number) => {
  try {
    const { data } = await api.get(`/inventario/${equipamento_id}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


  const atualizarEquipamento = async (payload: any) => {
    try{
      await api.put(
        `/inventario/${payload.equipamento_id}`,
        payload
      )
      await carregarEquipamentos()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const excluirEquipamento = async( equipamento_id: number ) => {
   try{
    await api.delete(`/inventario/${equipamento_id}`)
    setEquipos(
      prev =>
        prev.filter(
          item => item.equipamento_id !== equipamento_id
      )
    )
  } catch (error) {
    console.error(error)
    throw error
    }
  }

  const alterarEstadoEquipamento =
    async (
      equipamento_id:number,
      estado_actual:string,
      observacao:string
  ) => {
    try {
      await api.put(
        `/config/equipamentos/${equipamento_id}/estado`,
        {
          estado_actual,
          observacao
        }
      )
      setEquipos(
        prev =>
          prev.map(
            item =>
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


  const adicionarUnidade = async (
    grupo:any
  ) => {
    try {
      // console.log('Grupo: ', grupo)
      await api.post(
        `/inventario/unidade`,
        {
          marca: grupo.marca,
          modelo: grupo.modelo,
          // categoria_id: grupo.categoria_id,
          // marca_id: grupo.marca_id,
          // valor: grupo.valor
        }
      )
      await carregarEquipamentos()
    }catch(error){
      console.error(error)
      throw error
    }
  }
  useEffect(() => {
    carregarEquipamentos()
  },[])
  // console.log(equipos)

  return {
    equipos,
    carregarEquipamentos,
    criarEquipamento,
    atualizarEquipamento,
    alterarEstadoEquipamento,
    adicionarUnidade,
    excluirEquipamento,
    obterEquipamento
    // removerUnidade
  }
}
