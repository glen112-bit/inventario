import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'

type Props = {
  open:boolean
  onClose:() => void
}

export default function NovoAluguelDialog({
  open,
  onClose
}:Props){

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Novo Aluguel
      </DialogTitle>

      <DialogContent>

        Em construção...

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancelar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
