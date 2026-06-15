import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box
} from '@mui/material'

type Props = {
  open:boolean
  nome:string
  descricao:string
  setNome:(value:string)=>void
  setDescricao:(value:string)=>void
  onClose:()=>void
  onSalvar:()=>void
  editando?:boolean
}

export default function CategoriaDialog({
  open,
  nome,
  descricao,
  setNome,
  setDescricao,
  onClose,
  onSalvar,
  editando = false
}:Props){

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>

        {editando
          ? 'Editar Categoria'
          : 'Nova Categoria'
        }

      </DialogTitle>

      <DialogContent>

        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          mt={1}
        >

          <TextField
            fullWidth
            label="Nome"
            value={nome}
            onChange={(e) =>
              setNome(
                e.target.value
              )
            }
          />

          <TextField
            fullWidth
            multiline
            rows={3}
            label="Descrição"
            value={descricao}
            onChange={(e) =>
              setDescricao(
                e.target.value
              )
            }
          />

        </Box>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={onSalvar}
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
