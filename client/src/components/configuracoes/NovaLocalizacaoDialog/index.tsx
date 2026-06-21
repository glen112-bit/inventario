import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'

import { useState, useEffect } from 'react'
import useLocalizacoes from '../../../hooks/useLocalizacoes'

type Props = {
  open:boolean
  onClose:() => void
  onSalvar:(dados:any) => Promise<void>
}

export default function NovaLocalizacaoDialog({
  open,
  onClose,
  onSalvar
}:Props){

  const [localizacao, setLocalizacao] =
    useState('')

  useEffect(() => {

    if(open){
      setLocalizacao('')
    }

  }, [open])

  const salvar = async() => {

    if(!localizacao.trim()){
      return
    }

    await onSalvar({
      localizacao
    })

    setLocalizacao('')

    onClose()

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        Nova Localização
      </DialogTitle>

      <DialogContent>

        <TextField
          autoFocus
          fullWidth
          margin="normal"
          label="Localização"
          value={localizacao}
          onChange={(e) =>
            setLocalizacao(
              e.target.value
            )
          }
        />

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={salvar}
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
