import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Paper,
  Typography,
  Chip,
  Divider,
  Box
} from '@mui/material'

import QrCode2Icon from '@mui/icons-material/QrCode2'
import Inventory2Icon from '@mui/icons-material/Inventory2'

type Props = {
  open: boolean
  equipamento?: any
  onClose: () => void
}

export default function EquipamentoDetalhesDialog({
  open,
  equipamento,
  onClose
}: Props) {

  const formatarData = (data?: string) => {

    if (!data) return '-'

    return new Date(data).toLocaleDateString(
      'pt-BR'
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

  if (!equipamento) return null

  return (

    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >

      <DialogTitle>

        Detalhes do Equipamento

      </DialogTitle>

      <DialogContent>

        <Grid
          container
          spacing={3}
        >

          <Grid size={{ xs:12, md:4 }}>

            <Paper
              variant="outlined"
              sx={{
                height:260,
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                borderRadius:3
              }}
            >

              <Box
                textAlign="center"
              >

                <Inventory2Icon
                  sx={{
                    fontSize:80,
                    color:'text.secondary'
                  }}
                />

                <Typography
                  mt={2}
                  color="text.secondary"
                >
                  Sem imagem
                </Typography>

              </Box>

            </Paper>

          </Grid>

          <Grid size={{ xs:12, md:8 }}>

            <Typography
              variant="h5"
              fontWeight={700}
            >
              {equipamento.marca} {equipamento.modelo}
            </Typography>

            <Typography
              color="text.secondary"
              mb={2}
            >
              {equipamento.codigo_interno}
            </Typography>

            <Chip
              color={getCorEstado(
                equipamento.estado_actual
              )}
              label={equipamento.estado_actual}
            />

            <Divider sx={{ my:3 }} />

            <Grid
              container
              spacing={2}
            >

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Código
                </Typography>

                <Typography>

                  {equipamento.codigo_interno}

                </Typography>

              </Grid>

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Número de Série
                </Typography>

                <Typography>

                  {equipamento.numero_serie || '-'}

                </Typography>

              </Grid>

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Categoria
                </Typography>

                <Typography>

                  {equipamento.categoria || '-'}

                </Typography>

              </Grid>

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Marca
                </Typography>

                <Typography>

                  {equipamento.marca}

                </Typography>

              </Grid>

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Modelo
                </Typography>

                <Typography>

                  {equipamento.modelo}

                </Typography>

              </Grid>

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Localização
                </Typography>

                <Typography>

                  {equipamento.localizacao_nome || equipamento.localizacao}

                </Typography>

              </Grid>

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Valor
                </Typography>

                <Typography>

                  {equipamento.valor
                    ? Number(
                        equipamento.valor
                      ).toLocaleString(
                        'pt-BR',
                        {
                          style:'currency',
                          currency:'BRL'
                        }
                      )
                    : '-'}

                </Typography>

              </Grid>

              <Grid size={{ xs:6 }}>

                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  Compra
                </Typography>

                <Typography>

                  {formatarData(
                    equipamento.fecha_compra
                  )}

                </Typography>

              </Grid>

            </Grid>

          </Grid>

          <Grid size={{ xs:12 }}>

            <Divider sx={{ mb:2 }} />

            <Typography
              variant="subtitle1"
              fontWeight={600}
            >
              Descrição
            </Typography>

            <Typography
              color="text.secondary"
            >
              {equipamento.descripcion ||
               equipamento.descricao ||
               '-'}
            </Typography>

          </Grid>

          <Grid size={{ xs:12 }}>

            <Typography
              variant="subtitle1"
              fontWeight={600}
            >
              Observações
            </Typography>

            <Typography
              color="text.secondary"
            >
              {equipamento.observacoes || '-'}
            </Typography>

          </Grid>

          <Grid size={{ xs:12 }}>

            <Paper
              variant="outlined"
              sx={{
                p:3,
                borderRadius:3,
                textAlign:'center'
              }}
            >

              <QrCode2Icon
                sx={{
                  fontSize:80,
                  color:'text.secondary'
                }}
              />

              <Typography
                mt={1}
                color="text.secondary"
              >
                QR Code

              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                {equipamento.qr_code || '-'}
              </Typography>

            </Paper>

          </Grid>

        </Grid>

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
