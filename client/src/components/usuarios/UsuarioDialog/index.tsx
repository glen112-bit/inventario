
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
import { useState, useEffect } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  usuarioSelecionado?: any

  criarUsuario: (payload: any) => Promise<void>
  atualizarUsuario: (id: number, payload: any) => Promise<void>
  carregarUsuarios: () => Promise<void>
}

export default function UsuarioDialog({
  open,
  onClose,
  usuarioSelecionado,
  criarUsuario,
  atualizarUsuario,
  carregarUsuarios
}: Props) {

const {
    form,
    setForm,
    resetForm,
    buildPayload,
    validate
} = useUsuarioForm()

useEffect(() => {

    if (usuarioSelecionado) {

        setForm({
            nome: usuarioSelecionado.nome,
            email: usuarioSelecionado.email,
            telefone: usuarioSelecionado.telefone,
            password: '',
            senhaAtual: '',
            rol: usuarioSelecionado.rol,
            activo: usuarioSelecionado.activo
        })

    } else {

        resetForm()

    }

}, [usuarioSelecionado])



const handleSalvar = async () => {

    const { valid, errors } = validate(!!usuarioSelecionado);

    if (!valid) {
        console.log(errors)
        return
    }

const payload = buildPayload()

console.log('FORM:', form)
console.log('PAYLOAD:', payload)

    if (usuarioSelecionado) {
        await atualizarUsuario(
            usuarioSelecionado.id,
            payload
        )

    } else {

        await criarUsuario(payload)

    }

    await carregarUsuarios()

    resetForm()

    onClose()

}

  return (

    <Dialog
      open={ open }
      onClose={ onClose }
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        {
          usuarioSelecionado
            ?` ${usuarioSelecionado.nome}`
            : 'Novo Usuário' 
        }
      </DialogTitle>

      <DialogContent>

        <NovoUsuarioForm
          resetForm={resetForm}
          form={form}
          setForm={setForm}
          usuarioSelecionado={usuarioSelecionado}
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
