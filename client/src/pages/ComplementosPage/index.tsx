import { useState } from 'react'

import {
  Box,
  Paper
} from '@mui/material'

import useComplementos from '../../hooks/useComplementos'
import useEquipamentosDisponiveis from '../../hooks/useEquipamentosDisponiveis'

import ComplementosHeader from '../../components/complementos/ComplementosHeader'
import ComplementosToolbar from '../../components/complementos/ComplementosToolbar'
import ComplementosTable from '../../components/complementos/ComplementosTable'
import ComplementoDialog from '../../components/complementos/ComplementoDialog'

type Props = {
  aluguel:any
}

export default function ComplementosPage({
  aluguel
}:Props){

  const {

    complementos,

    criarComplemento,

    atualizarComplemento,

    excluirComplemento,

    finalizarComplemento,

    carregarComplementos

  } = useComplementos()

  const {

    equipamentos

  } = useEquipamentosDisponiveis()

  const [open,setOpen] = useState(false)

  const [complementoSelecionado,
    setComplementoSelecionado] =
      useState<any>(null)

  const novoComplemento = ()=>{

    setComplementoSelecionado(null)

    setOpen(true)

  }

  const editarComplemento = (
    complemento:any
  )=>{

    setComplementoSelecionado(complemento)

    setOpen(true)

  }

  const salvar = async(
    dados:any
  )=>{

    try{

      if(complementoSelecionado){

        await atualizarComplemento({

          ...dados,

          id: complementoSelecionado.id

        })

      }else{

        await criarComplemento({

          ...dados,

          aluguel_id: aluguel.id

        })

      }

      await carregarComplementos(
        aluguel.id
      )

      setOpen(false)

    }catch(error){

      console.error(error)

    }

  }

  return(

    <Box>

      <ComplementosHeader
        onNovo={novoComplemento}
      />

      <Paper
        sx={{
          p:3,
          borderRadius:3
        }}
      >

        <ComplementosToolbar />

        <ComplementosTable

          complementos={complementos}

          onEditar={editarComplemento}

          onExcluir={excluirComplemento}

          onFinalizar={finalizarComplemento}

        />

      </Paper>

      <ComplementoDialog

        open={open}

        aluguel={aluguel}

        equipamentos={equipamentos}

        complemento={complementoSelecionado}

        onClose={()=>
          setOpen(false)
        }

        onSalvar={salvar}

      />

    </Box>

  )

}
