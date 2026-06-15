import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid
} from '@mui/material'

type Props = {
  open: boolean
  onClose: () => void
  onSalvar: () => void

  marca: string
  setMarca: (v: string) => void

  modelo: string
  setModelo: (v: string) => void

  estado: string
  setEstado: (v: string) => void

  descricao: string
  setDescricao: (v: string) => void

  localizacao: string
  setLocalizacao: (v: string) => void

  valor: number
  setValor: (v: number) => void
}

export default function EquipamentoDialog(props: Props) {
  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="md" fullWidth>
      <DialogTitle>Novo Equipamento</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Marca"
              value={props.marca}
              onChange={(e) => props.setMarca(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Modelo"
              value={props.modelo}
              onChange={(e) => props.setModelo(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Estado"
              value={props.estado}
              onChange={(e) => props.setEstado(e.target.value)}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Localização"
              value={props.localizacao}
              onChange={(e) => props.setLocalizacao(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Descrição"
              value={props.descricao}
              onChange={(e) => props.setDescricao(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label="Valor"
              value={props.valor}
              onChange={(e) =>
                props.setValor(Number(e.target.value))
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={props.onClose}>
          Cancelar
        </Button>

        <Button
          variant="contained"
          onClick={props.onSalvar}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
