import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  Box
} from '@mui/material'

type Props = {
  open: boolean
  equipamento?: any
  historico: any[]
  onClose: () => void
}

export default function EquipamentoHistoricoDialog({
  open,
  equipamento,
  historico,
  onClose
}: Props) {

  const formatarData = (data?: string) => {

    if (!data) return '-'

    return new Date(data).toLocaleString(
      'pt-BR',
      {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
    )

  }

  const getCorEstado = (estado: string) => {

    switch (estado) {

      case 'disponivel':
        return 'success'

      case 'alugado':
        return 'primary'

      case 'reservado':
        return 'warning'

      case 'manutencao':
        return 'error'

      default:
        return 'default'

    }

  }

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >

      <DialogTitle>

        Histórico do Equipamento

      </DialogTitle>

      <DialogContent>

        <Box mb={3}>

          <Typography
            variant="h6"
            fontWeight={700}
          >
            {equipamento?.codigo_interno}
          </Typography>

          <Typography color="text.secondary">

            {equipamento?.marca} {equipamento?.modelo}

          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >

            Série: {equipamento?.numero_serie || '-'}

          </Typography>

        </Box>

        <Paper
          elevation={0}
          sx={{
            borderRadius:3,
            border:'1px solid',
            borderColor:'divider'
          }}
        >

          <TableContainer>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell>
                    Data
                  </TableCell>

                  <TableCell>
                    Estado
                  </TableCell>

                  <TableCell>
                    Usuário
                  </TableCell>

                  <TableCell>
                    Observação
                  </TableCell>

                </TableRow>

              </TableHead>

              <TableBody>

                {

                  historico.length === 0

                  ?

                  (

                    <TableRow>

                      <TableCell
                        colSpan={4}
                        align="center"
                      >

                        Nenhum histórico encontrado.

                      </TableCell>

                    </TableRow>

                  )

                  :

                  historico.map((item:any) => (

                    <TableRow
                      hover
                      key={item.id}
                    >

                      <TableCell>

                        {formatarData(
                          item.created_at
                        )}

                      </TableCell>

                      <TableCell>

                        <Chip
                          size="small"
                          label={item.estado}
                          color={getCorEstado(
                            item.estado
                          )}
                        />

                      </TableCell>

                      <TableCell>

                        {item.usuario || '-'}

                      </TableCell>

                      <TableCell>

                        {item.observacao || '-'}

                      </TableCell>

                    </TableRow>

                  ))

                }

              </TableBody>

            </Table>

          </TableContainer>

        </Paper>

      </DialogContent>

      <DialogActions>

        <Button
          onClick={onClose}
        >
          Fechar
        </Button>

      </DialogActions>

    </Dialog>

  )

}
