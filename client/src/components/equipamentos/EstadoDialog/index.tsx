import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from '@mui/material'

import EstadoSelect from '../EstadoSelect'

type Props = {
  open:boolean
  estadoAtual:string
  observacao:string
  onClose:() => void
  onSalvar:() => void
  setEstadoAtual:(value:string)=>void
  setObservacao:(value:string)=>void
}

export default function EstadoDialog({
  open,
  estadoAtual,
  observacao,
  onClose,
  onSalvar,
  setEstadoAtual,
  setObservacao
}:Props){

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>
        Alterar Estado
      </DialogTitle>

      <DialogContent>

        <EstadoSelect
          value={estadoAtual}
          onChange={setEstadoAtual}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          margin="normal"
          label="Observação"
          value={observacao}
          onChange={(e)=>
            setObservacao(
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
          onClick={onSalvar}
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
