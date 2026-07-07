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
    senha: '',
    perfil: 'usuario'
  })

  useEffect(() => {

    if (usuario) {

      setForm({
        nome: usuario.nome || '',
        email: usuario.email || '',
        senha: '',
        perfil: usuario.perfil || 'usuario'
      })

    } else {

      limparFormulario()

    }

  }, [usuario, open])

  const limparFormulario = () => {

    setForm({
      nome: '',
      email: '',
      senha: '',
      perfil: 'usuario'
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

    if (!usuario && !form.senha.trim()) {
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
              value={form.senha}
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
              value={form.perfil}
              onChange={(e) =>
                setForm({
                  ...form,
                  perfil: e.target.value
                })
              }
            >

              {PERFIS.map((perfil) => (

                <MenuItem
                  key={perfil}
                  value={perfil}
                >
                  {perfil}
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
