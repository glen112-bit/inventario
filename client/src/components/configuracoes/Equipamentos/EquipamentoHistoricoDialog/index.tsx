import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Divider
} from '@mui/material'

import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot
} from '@mui/lab'

import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import BuildIcon from '@mui/icons-material/Build'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

type Props = {
  open: boolean
  historico: any[]
  equipamento: any
  onClose: () => void
}

export default function EquipamentoHistoricoDialog({
  open,
  historico,
  equipamento,
  onClose
}: Props) {

  const getIcon = (estado: string) => {

    switch (estado) {

      case 'alugado':
        return <LocalShippingIcon />

      case 'disponivel':
        return <KeyboardReturnIcon />

      case 'manutencao':
        return <BuildIcon />

      case 'danificado':
        return <WarningAmberIcon />

      default:
        return <CheckCircleIcon />

    }

  }

  const getColor = (estado: string) => {

    switch (estado) {

      case 'alugado':
        return 'primary'

      case 'disponivel':
        return 'success'

      case 'manutencao':
        return 'warning'

      case 'danificado':
        return 'error'

      default:
        return 'grey'

    }

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>
        Histórico do Equipamento
      </DialogTitle>

      <DialogContent>

        {equipamento && (

          <Box mb={3}>

            <Typography variant="h6">

              {equipamento.codigo_interno}

            </Typography>

            <Typography color="text.secondary">

              {equipamento.marca} {equipamento.modelo}

            </Typography>

            <Typography variant="body2">

              Série: {equipamento.numero_serie}

            </Typography>

            <Typography variant="body2">

              QR: {equipamento.qr_code}

            </Typography>

          </Box>

        )}

        <Divider sx={{ mb:3 }} />

        <Timeline position="right">

          {

            historico.map((item:any,index:number)=>(

              <TimelineItem key={item.id}>

                <TimelineSeparator>

                  <TimelineDot
                    color={getColor(item.estado_novo) as any}
                  >

                    {getIcon(item.estado_novo)}

                  </TimelineDot>

                  {

                    index !== historico.length-1 &&

                    <TimelineConnector />

                  }

                </TimelineSeparator>

                <TimelineContent>

                  <Typography
                    variant="subtitle1"
                    fontWeight={700}
                  >

                    {item.estado_anterior}

                    {' → '}

                    {item.estado_novo}

                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >

                    {new Date(item.created_at).toLocaleString()}

                  </Typography>

                  <Box mt={1} mb={1}>

                    <Chip
                      size="small"
                      label={item.usuario ?? 'Sistema'}
                    />

                  </Box>

                  {

                    item.observacao &&

                    <Typography>

                      {item.observacao}

                    </Typography>

                  }

                </TimelineContent>

              </TimelineItem>

            ))

          }

        </Timeline>

      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Fechar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
