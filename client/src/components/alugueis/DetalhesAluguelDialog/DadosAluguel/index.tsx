import {
  Grid,
  Typography,
  Paper,
  Chip,
  Box
} from '@mui/material'

type Props = {
  aluguel: any
}

export default function DadosAluguel({
  aluguel
}: Props) {

  if (!aluguel) return null

  const formatarData = (data?: string) => {

    if (!data) return '-'

    return new Date(data).toLocaleDateString(
      'pt-BR'
    )

  }

  const getCorEstado = (estado: string) => {

    switch (estado) {

      case 'ativo':
        return 'success'

      case 'reservado':
        return 'warning'

      case 'cancelado':
        return 'error'

      case 'finalizado':
        return 'default'

      default:
        return 'default'

    }

  }

  return (

    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 4,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >

      <Typography
        variant="h6"
        fontWeight={700}
        mb={3}
      >
        Informações do Aluguel
      </Typography>

      <Grid
        container
        spacing={3}
      >

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Cliente
          </Typography>

          <Typography fontWeight={600}>
            {aluguel.cliente}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Estado
          </Typography>

          <Box mt={0.5}>

            <Chip
              size="small"
              label={aluguel.estado}
              color={getCorEstado(aluguel.estado)}
            />

          </Box>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Data de Saída
          </Typography>

          <Typography>
            {formatarData(aluguel.fecha_salida)}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Data de Retorno
          </Typography>

          <Typography>
            {formatarData(aluguel.fecha_retorno)}
          </Typography>

        </Grid>

        <Grid size={{ xs: 12 }}>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            Observações
          </Typography>

          <Paper
            variant="outlined"
            sx={{
              mt: 1,
              p: 2,
              bgcolor: 'background.default'
            }}
          >

            <Typography>

              {
                aluguel.observacoes ||
                'Nenhuma observação cadastrada.'
              }

            </Typography>

          </Paper>

        </Grid>

      </Grid>

    </Paper>

  )

}
