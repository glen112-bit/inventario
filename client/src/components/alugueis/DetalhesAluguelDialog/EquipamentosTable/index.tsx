import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from '@mui/material'

type Props = {
  equipamentos?: any[]
}

export default function EquipamentosTable({
  equipamentos = []
}: Props) {

  return (

    <Paper
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 3
      }}
    >

      <Typography
        variant="h6"
        fontWeight={700}
        mb={2}
      >
        Equipamentos do Aluguel
      </Typography>

      {

        equipamentos.length === 0 ? (

          <Typography color="text.secondary">
            Nenhum equipamento cadastrado.
          </Typography>

        ) : (

          <TableContainer>

            <Table>

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

    </Paper>

  )

}
