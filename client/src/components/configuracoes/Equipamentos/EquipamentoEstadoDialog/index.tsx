import { useEffect, useState } from 'react'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Alert,
  Typography
} from '@mui/material'

type Props = {
  open: boolean
  equipamento?: any
  onClose: () => void
  onSalvar: (dados: any) => void
}

export default function EquipamentoEstadoDialog({
  open,
  equipamento,
  onClose,
  onSalvar
}: Props) {

  const [estado, setEstado] = useState('disponivel')
  const [observacao, setObservacao] = useState('')

  useEffect(() => {

    if (equipamento) {

      setEstado(
        equipamento.estado_actual || 'disponivel'
      )

      setObservacao('')

    }

  }, [equipamento, open])

  const salvar = () => {

    onSalvar({

      equipamento_id: equipamento.equipamento_id,

      estado_actual: estado,

      observacao

    })

    setObservacao('')

    onClose()

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
    >

      <DialogTitle>

        Alterar Estado do Equipamento

      </DialogTitle>

      <DialogContent>

        <Typography
          variant="h6"
          fontWeight={700}
          mb={1}
        >
          {equipamento?.codigo_interno}
        </Typography>

        <Typography
          color="text.secondary"
          mb={3}
        >
          {equipamento?.marca} {equipamento?.modelo}
        </Typography>

        <Alert
          severity="info"
          sx={{ mb: 3 }}
        >
          Toda alteração ficará registrada no histórico do equipamento.
        </Alert>

        <Grid
          container
          spacing={2}
        >

          <Grid size={{ xs:12 }}>

            <TextField
              select
              fullWidth
              label="Novo Estado"
              value={estado}
              onChange={(e)=>
                setEstado(
                  e.target.value
                )
              }
            >

              <MenuItem value="disponivel">
                Disponível
              </MenuItem>

              <MenuItem value="alugado">
                Alugado
              </MenuItem>

              <MenuItem value="reservado">
                Reservado
              </MenuItem>

              <MenuItem value="manutencao">
                Manutenção
              </MenuItem>

              <MenuItem value="baixado">
                Baixado
              </MenuItem>

            </TextField>

          </Grid>

          <Grid size={{ xs:12 }}>

            <TextField
              fullWidth
              multiline
              rows={4}
              label="Observação"
              placeholder="Motivo da alteração..."
              value={observacao}
              onChange={(e)=>
                setObservacao(
                  e.target.value
                )
              }
            />

          </Grid>

        </Grid>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={salvar}
        >
          Salvar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
