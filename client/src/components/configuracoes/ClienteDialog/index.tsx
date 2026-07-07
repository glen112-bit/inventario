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
  open:boolean
  cliente?: any
  onClose: () => void
  onSalvar: (dados: any) => void
}

export default function ClienteDialog({
  open,
  cliente,
  onClose,
  onSalvar
}: Props) {

  const [form, setForm] = useState({
    nome: '',
    empresa: '',
    documento: '',
    telefone: '',
    email: '',
    endereco: '',
    cidade: '',
    estado: '',
    observacoes: ''
  })

  useEffect(() => {

    if (cliente) {

      setForm({
        nome: cliente.nome || '',
        empresa: cliente.empresa || '',
        documento: cliente.documento || '',
        telefone: cliente.telefone || '',
        email: cliente.email || '',
        endereco: cliente.endereco || '',
        cidade: cliente.cidade || '',
        estado: cliente.estado || '',
        observacoes: cliente.observacoes || ''
      })

    } else {

      limparFormulario()

    }

  }, [cliente ])

  const limparFormulario = () => {

    setForm({
      nome: '',
      empresa: '',
      documento: '',
      telefone: '',
      email: '',
      endereco: '',
      cidade: '',
      estado: '',
      observacoes: ''
    })

  }

  const salvar = () => {

    if (!form.nome.trim()) {
      alert('Informe o nome do cliente.')
      return
    }

    onSalvar(form)

    limparFormulario()

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

          <Grid size={{ xs:12, md:6 }}>

            <TextField
              fullWidth
              label="Nome"
              value={form.nome}
              onChange={(e)=>
                setForm({
                  ...form,
                  nome:e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs:12, md:6 }}>

            <TextField
              fullWidth
              label="CPF / CNPJ"
              value={form.documento}
              onChange={(e)=>
                setForm({
                  ...form,
                  documento:e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs:12, md:6 }}>

            <TextField
              fullWidth
              label="Telefone"
              value={form.telefone}
              onChange={(e)=>
                setForm({
                  ...form,
                  telefone:e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs:12 }}>

            <TextField
              fullWidth
              type="email"
              label="Email"
              value={form.email}
              onChange={(e)=>
                setForm({
                  ...form,
                  email:e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs:12 }}>

            <TextField
              fullWidth
              label="Endereço"
              value={form.endereco}
              onChange={(e)=>
                setForm({
                  ...form,
                  endereco:e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs:12, md:6 }}>

            <TextField
              fullWidth
              label="Cidade"
              value={form.cidade}
              onChange={(e)=>
                setForm({
                  ...form,
                  cidade:e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs:12, md:6 }}>

            <TextField
              fullWidth
              label="Estado"
              value={form.estado}
              onChange={(e)=>
                setForm({
                  ...form,
                  estado:e.target.value
                })
              }
            />

          </Grid>

          <Grid size={{ xs:12 }}>

            <TextField
              fullWidth
              multiline
   disabled={false}
              rows={4}
              label="Observações"
              value={form.observacoes}
              onChange={(e)=>
                setForm({
                  ...form,
                  observacoes:e.target.value
                })
              }
            />

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={()=>{
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
