import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography
} from '@mui/material'

type Props = {
  equipamentos?: any[]
}

export default function ComplementoTable({
  equipamentos = []
}: Props) {

  if (equipamentos.length === 0) {

    return (

      <Typography
        color="text.secondary"
        sx={{ py: 2 }}
      >
        Nenhum equipamento neste complemento.
      </Typography>

    )

  }

  return (

    <TableContainer
      component={Paper}
      variant="outlined"
      sx={{
        mt: 2,
        borderRadius: 2
      }}
    >

      <Table size="small">

        <TableHead>

          <TableRow>

            <TableCell sx={{ fontWeight: 700 }}>
              Código
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Marca
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Modelo
            </TableCell>

            <TableCell sx={{ fontWeight: 700 }}>
              Estado
            </TableCell>

          </TableRow>

        </TableHead>

        <TableBody>

          {equipamentos.map((equipamento) => (

            <TableRow
              hover
              key={equipamento.equipamento_id}
            >

              <TableCell>
                {equipamento.codigo_interno}
              </TableCell>

              <TableCell>
                {equipamento.marca}
              </TableCell>

              <TableCell>
                {equipamento.modelo}
              </TableCell>

              <TableCell>

                <Chip
                  size="small"
                  label={equipamento.estado_actual}
                  color={
                    equipamento.estado_actual === 'disponivel'
                      ? 'success'
                      : equipamento.estado_actual === 'alugado'
                        ? 'warning'
                        : equipamento.estado_actual === 'manutencao'
                          ? 'error'
                          : 'default'
                  }
                />

              </TableCell>

            </TableRow>

          ))}

        </TableBody>

      </Table>

    </TableContainer>

  )

}
