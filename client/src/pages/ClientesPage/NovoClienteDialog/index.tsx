import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField
} from '@mui/material'

type Props = {
  open: boolean
  onClose: () => void
  onSalvar: (dados: any) => Promise<void>
  cliente?: any
}

export default function NovoClienteDialog({
  open,
  onClose,
  onSalvar,
  cliente
}: Props) {

  const [form, setForm] = useState({
    nome: '',
    documento: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    usuario_id: null
  })

  useEffect(() => {

    if (cliente) {

      setForm({
        nome: cliente.nome || '',
        documento: cliente.documento || '',
        telefone: cliente.telefone || '',
        email: cliente.email || '',
        endereco: cliente.endereco || '',
        cidade: cliente.cidade || '',
        usuario_id: cliente.usuario_id || null
      })

    } else {

      setForm({
        nome: '',
        documento: '',
        telefone: '',
        email: '',
        endereco: '',
        cidade: '',
        usuario_id: null
      })

    }

  }, [cliente, open])

  const alterar = (
    campo: string,
    valor: any
  ) => {

    setForm(prev => ({
      ...prev,
      [campo]: valor
    }))

  }

  const salvar = async () => {

    await onSalvar(form)

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>

        {cliente
          ? 'Editar Cliente'
          : 'Novo Cliente'}

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
                alterar('nome', e.target.value)
              }
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Documento"
              value={form.documento}
              onChange={(e) =>
                alterar('documento', e.target.value)
              }
            />

          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>

            <TextField
              fullWidth
              label="Telefone"
              value={form.telefone}
              onChange={(e) =>
                alterar('telefone', e.target.value)
              }
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              label="E-mail"
              value={form.email}
              onChange={(e) =>
                alterar('email', e.target.value)
              }
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              label="Endereço"
              value={form.endereco}
              onChange={(e) =>
                alterar('endereco', e.target.value)
              }
            />

          </Grid>

          <Grid size={{ xs: 12 }}>

            <TextField
              fullWidth
              label="Cidade"
              value={form.cidade}
              onChange={(e) =>
                alterar('cidade', e.target.value)
              }
            />

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
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
