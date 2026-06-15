import { useState } from 'react'

export default function useEdicaoEstado() {

  const [open,setOpen] =
    useState(false)

  const [
    equipamentoSelecionado,
    setEquipamentoSelecionado
  ] = useState<any>(null)

  const [estadoAtual,setEstadoAtual] =
    useState('')

  const [observacao,setObservacao] =
    useState('')

  const abrirEdicaoEstado =
    (equipamento:any) => {

      setEquipamentoSelecionado(
        equipamento
      )

      setEstadoAtual(
        equipamento.estado_actual
      )

      setObservacao('')

      setOpen(true)

    }

  const fecharEdicaoEstado =
    () => {

      setOpen(false)

      setEquipamentoSelecionado(
        null
      )

      setEstadoAtual('')

      setObservacao('')

    }
  const salvarEstado =
    async (
      alterarEstado:any
    ) => {

      if(
        !equipamentoSelecionado
      ) return

      await alterarEstado(
        equipamentoSelecionado.equipamento_id,
        estadoAtual,
        observacao
      )

    fecharEdicaoEstado()

  }
  return {
    open,
    setOpen,
    equipamentoSelecionado,
    estadoAtual,
    setEstadoAtual,
    observacao,
    setObservacao,
    abrirEdicaoEstado,
    fecharEdicaoEstado,
    salvarEstado
  }

}
