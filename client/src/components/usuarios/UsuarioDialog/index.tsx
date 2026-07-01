
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel
} from '@mui/material'
import NovoUsuarioForm from '../NovoUsuarioForm'
import useUsuarioForm from '../../../hooks/useUsuarioForm'
import { useState } from 'react'

type Props = {
  open:boolean
  onClose:() => void
  onSalvar:(dados:any)=>void
}

export default function UsuarioDialog({
  open,
  onClose,
  onSalvar
}:Props){
  // console.log(equipamentos)
const {
   form,
   setForm,
   resetForm,
   validate,
   buildPayload
  } = useUsuarioForm()


  const handleSalvar = () => {

  const { valid } = validate()

  if (!valid) return

  onSalvar(buildPayload())

  resetForm()

  onClose()
window.location.reload()
}
  return (

   <Dialog
    open={open}
    onClose={() => onClose}
    maxWidth="md"
    fullWidth
>
    <DialogTitle>
        Novo Usuário
    </DialogTitle>

    <DialogContent>

        <NovoUsuarioForm
            form={form}
            setForm={setForm}
        />

    </DialogContent>

    <DialogActions>

        <Button
            onClick={ onClose }
        >
            Cancelar
        </Button>

        <Button
            variant="contained"
            onClick={ handleSalvar }
        >
            Salvar
        </Button>

    </DialogActions>
</Dialog>
  )

}
