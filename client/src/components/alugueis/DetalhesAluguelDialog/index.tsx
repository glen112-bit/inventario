import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'

import DadosAluguel from './DadosAluguel'
import EquipamentosTable from './EquipamentosTable'
import ComplementosHeader from './ComplementosHeader'
import ComplementosList from './ComplementosList'
import ComplementoDialog from './ComplementoDialog'

import useComplementos from '../../../hooks/useComplementos'
import useEquipamentosDisponiveis from '../../../hooks/useEquipamentosDisponiveis'

type Props = {
  open: boolean
  aluguel: any
  onClose: () => void
}

export default function DetalhesAluguelDialog({
  open,
  aluguel,
  onClose
}: Props) {

  const {
    equipamentos
  } = useEquipamentosDisponiveis()

  const {
    complementos,
    criarComplemento,
    atualizarComplemento,
    excluirComplemento,
    finalizarComplemento,
    carregarComplementos
  } = useComplementos()

  const [openComplemento, setOpenComplemento] =
    useState(false)

  const [complementoSelecionado, setComplementoSelecionado] =
    useState<any>(null)

  useEffect(() => {

    if (open && aluguel) {

      carregarComplementos(aluguel.id)

    }

  }, [open, aluguel])

  const novoComplemento = () => {

    setComplementoSelecionado(null)

    setOpenComplemento(true)

  }

  const editarComplemento = (complemento:any) => {

    setComplementoSelecionado(complemento)

    setOpenComplemento(true)

  }

  const salvarComplemento = async (dados:any) => {

    try {

      if (complementoSelecionado) {

        await atualizarComplemento({

          ...dados,

          id: complementoSelecionado.id,

          aluguel_id: aluguel.id

        })

      } else {

        await criarComplemento({

          ...dados,

          aluguel_id: aluguel.id

        })

      }

      await carregarComplementos(aluguel.id)

      setOpenComplemento(false)

    } catch (error) {

      console.error(error)

    }

  }

  const exportarComplementoPdf = (complemento:any) => {

    console.log('Exportar PDF:', complemento)

    // gerarPdfComplemento(complemento)

  }

  if (!aluguel) return null

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >

      <DialogTitle>
        Aluguel #{aluguel.id}
      </DialogTitle>

      <DialogContent>

        <DadosAluguel
          aluguel={aluguel}
        />

        <EquipamentosTable
          equipamentos={aluguel.equipamentos}
        />

        <ComplementosHeader
          onNovo={novoComplemento}
        />

        <ComplementosList
          complementos={complementos}
          onEditar={editarComplemento}
          onExcluir={excluirComplemento}
          onFinalizar={finalizarComplemento}
          onPdf={exportarComplementoPdf}
        />

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Fechar
        </Button>

      </DialogActions>

      <ComplementoDialog
        open={openComplemento}
        aluguel={aluguel}
        complemento={complementoSelecionado}
        equipamentos={equipamentos}
        onClose={() => setOpenComplemento(false)}
        onSalvar={salvarComplemento}
      />

    </Dialog>

  )

}
