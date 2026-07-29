import { useMemo, useState } from 'react'

import api from '../services/api'

import useEquipamentos from './useEquipamentos'
import useCategorias from './useCategorias'
import useMarcas from './useMarcas'
import useLocalizacoes from './useLocalizacoes'

export default function useEquipamentosPage() {

  const {
    equipos,
    criarEquipamento,
    atualizarEquipamento,
    excluirEquipamento,
    alterarEstadoEquipamento
  } = useEquipamentos()

  const { categorias } = useCategorias()
  const { marcas } = useMarcas()
  const { localizacoes } = useLocalizacoes()

  const [search, setSearch] = useState('')

  const [open, setOpen] = useState(false)
  const [openDetalhes, setOpenDetalhes] = useState(false)
  const [openHistorico, setOpenHistorico] = useState(false)
  const [openEstado, setOpenEstado] = useState(false)

  const [historico, setHistorico] = useState<any[]>([])

  const [equipamentoSelecionado, setEquipamentoSelecionado] =
    useState<any>(null)

  const equipamentosFiltrados = useMemo(() => {

    const texto = search.toLowerCase()

    return (equipos ?? []).filter((eq:any)=>

    (eq.codigo_interno ?? '')
    .toLowerCase()
    .includes(texto)

    ||

      (eq.numero_serie ?? '')
    .toLowerCase()
    .includes(texto)

    ||

      (eq.modelo ?? '')
    .toLowerCase()
    .includes(texto)

    ||

      (eq.marca ?? '')
    .toLowerCase()
    .includes(texto)

                                 )

  },[equipos,search])

  const novoEquipamento = () => {

    setEquipamentoSelecionado(null)

    setOpen(true)

  }

  const editarEquipamento = (equipamento:any) => {

    setEquipamentoSelecionado(equipamento)

    setOpen(true)

  }

  const abrirDetalhes = (equipamento:any) => {

    setEquipamentoSelecionado(equipamento)

    setOpenDetalhes(true)

  }

  const abrirEstado = (equipamento:any) => {

    setEquipamentoSelecionado(equipamento)

    setOpenEstado(true)

  }

  const abrirHistorico = async(equipamento:any) => {

    try{

      const response = await api.get(
        `/equipamentos/${equipamento.equipamento_id}/historico`
      )

      setHistorico(response.data)

      setEquipamentoSelecionado(equipamento)

      setOpenHistorico(true)

    }catch(error){

      console.error(error)

    }

  }

  const salvar = async(dados:any)=>{

    try{

      if(equipamentoSelecionado){

        await atualizarEquipamento({
          ...dados,
          equipamento_id:
            equipamentoSelecionado.equipamento_id
        })

      }else{

        await criarEquipamento(dados)

      }

      setOpen(false)

    }catch(error){

      console.error(error)

    }

  }

  const alterarEstado = async(dados:any)=>{

    try{

      await alterarEstadoEquipamento(

        dados.equipamento_id,

        dados.estado_actual,

        dados.observacao

      )

      setOpenEstado(false)

    }catch(error){

      console.error(error)

    }

  }

  return {

    categorias,
    marcas,
    localizacoes,

    search,
    setSearch,

    open,
    setOpen,

    openDetalhes,
    setOpenDetalhes,

    openHistorico,
    setOpenHistorico,

    openEstado,
    setOpenEstado,

    equipamentoSelecionado,

    historico,

    equipamentosFiltrados,

    novoEquipamento,

    editarEquipamento,

    abrirDetalhes,

    abrirHistorico,

    abrirEstado,

    salvar,

    alterarEstado,

    excluirEquipamento

  }

}
