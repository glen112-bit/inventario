import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField
} from '@mui/material'
import { useState } from 'react'

type Props = {
  open:boolean
  onClose:() => void
  onSalvar:(dados:any) => void
}

export default function NovoClienteDialog({
  open,
  onClose,
  onSalvar
}:Props){

  const [form,setForm] = useState({
    nome:'',
    documento:'',
    telefone:'',
    email:'',
    endereco:'',
    activo:1
  })

  const limparFormulario = () => {
    setForm({
      nome:'',
      documento:'',
      telefone:'',
      email:'',
      endereco:'',
      activo:1
    })
  }

  const salvar = async() => {

    await onSalvar(form)

    limparFormulario()

    onClose()
  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Novo Cliente
      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={2}
          sx={{ mt:1 }}
        >

          <Grid size={{ xs:12 }}>
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
              label="Documento"
              value={form.documento}
              onChange={(e)=>
                setForm({
                  ...form,
                  documento:e.target.value
                })
              }
            />
          </Grid>

          <Grid size={{ xs:12 }}>
            <TextField
              fullWidth
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
