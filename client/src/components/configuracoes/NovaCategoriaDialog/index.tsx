import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'

import { useState, useEffect } from 'react'
import useCategorias from '../../../hooks/useCategorias'


type Props = {
  open:boolean
  onClose:() => void
  onSalvar:(dados:any) => Promise<void>
}

export default function NovaCategoriaDialog({
  open,
  onClose,
  onSalvar
}:Props){

  const [categoria, setCategoria] = useState('')
  const {
    categorias,
    carregarCategorias,
    criarCategoria
  } = useCategorias()

  useEffect(() => {

    if(open){
      setCategoria('')
    }

  }, [open])

  const salvar = async() => {

    if(!categoria.trim()){
      return
    }

    await onSalvar({
      categoria
    })

    setCategoria('')

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
        Nova Categoria
      </DialogTitle>

      <DialogContent>

        <TextField
          autoFocus
          fullWidth
          margin="normal"
          label="Categoria"
          value={categoria}
          onChange={(e)=>
            setCategoria(
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
