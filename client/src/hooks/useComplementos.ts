import { useState } from 'react'
import api from '../services/api'

export default function useComplementos(){
  const [ complementos, setComplementos ] = useState<any[]>([])

  const carregarComplementos = async(
    aluguelId:number
  ) => {
    const {data} = await api.get(
      `/alugueis/${aluguelId}/complementos`
    )
    setComplementos(data)
  }
  const buscarComplemento = async(
    id:number
  ) => {
    const {data} = await api.get(
      `/complementos/${id}`
    )
    return data
  }
  const criarComplemento = async(
    payload:any
  ) => {
    await api.post('/complementos', payload)
    await carregarComplementos(payload.aluguel_id)
  }
  const atualizarComplemento = async(
    payload:any
  ) => {
    await api.put(
      `/complementos/${payload.id}`, 
      payload
    )
    await carregarComplementos(
      payload.aluguel_id
    )
  }
  const excluirComplemento =  async(
    complemento:any
  ) => {
    await api.delete(
      `/complementos/${complemeto.id}`
    )
    setComplementos(
      prev => 
      prev.filter(
        item => item.id !== complemento.id
      )
    )
  }
  const finalizarComplemento = async (
    complemento:any
  ) => {
    await api.put(
      `/complementos/${complemento.id}/finalizar`
    )
    await carregarComplementos(
      complemento.aluguel_id
    )
  }
  return{
    complementos,
    carregarComplementos,
    buscarComplemento,
    criarComplemento,
    atualizarComplemento,
    excluirComplemento,
    finalizarComplemento
  }
}
