import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem
} from '@mui/material'

type Props = {
  open: boolean
  usuario?: any
  onClose: () => void
  onSalvar: (dados: any) => void
}

const PERFIS = [
  'admin',
  'operador',
  'usuario'
]

export default function UsuarioDialog({
  open,
  usuario,
  onClose,
  onSalvar
}: Props) {

  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    password: '',
    rol: 'operador',
    activo: true
  })

  useEffect(() => {

    if (usuario) {

      setForm({
        nome: usuario.nome || '',
        email: usuario.email || '',
        telefone: usuario.telefone || '',
        password: '',
        rol: usuario.rol || 'usuario',
        activo: usuario.activo ?? true
      })

    } else {

      limparFormulario()

    }

  }, [usuario, open])

  const limparFormulario = () => {

    setForm({
      nome: '',
      email: '',
      telefone: '',
      password: '',
      rol: 'operador',
      activo: true
    })

  }

  const salvar = () => {

    if (!form.nome.trim()) {
      alert('Informe o nome.')
      return
    }

    if (!form.email.trim()) {
      alert('Informe o e-mail.')
      return
    }

    if (!usuario && !form.password.trim()) {
      alert('Informe a senha.')
      return
    }

    onSalvar(form)

    limparFormulario()

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        {usuario
          ? 'Editar Usuário'
          : 'Novo Usuário'}
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt: 1 }}
        >

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              label="Nome"
              value={form.nome}
              onChange={(e) =>
                setForm({
                  ...form,
                  nome: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              type="email"
              label="E-mail"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              type="password"
              label={
                usuario
                  ? 'Nova Senha (opcional)'
                  : 'Senha'
              }
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  senha: e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              select
              fullWidth
              label="Perfil"
              value={form.rol}
              onChange={(e) =>
                setForm({
                  ...form,
                  rol: e.target.value
                })
              }
            >

              {PERFIS.map((rol) => (

                <MenuItem
                  key={rol}
                  value={rol}
                >
                  {rol}
                </MenuItem>

              ))}

            </TextField>

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={() => {
            limparFormulario()
            onClose()
          }}
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
